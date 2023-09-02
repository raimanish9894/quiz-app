import React, { useState, useEffect } from "react";
import { useQuiz } from "./components/QuizContext";
import Timer from "./components/Timer";
import StartPage from "./components/StartPage";
import Question from "./components/Question";
import OverviewPanel from "./components/OverviewPanel";
import ReportPage from "./components/Report";

function App() {
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    if (quizStarted && !quizCompleted) {
        window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, [quizStarted, quizCompleted]);

const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "Are you sure you want to quit the quiz?";
};

  useEffect(() => {
    const answeredQuestions = state.userAnswers.filter(answer => answer !== null && answer !== undefined).length;
    if (answeredQuestions === 15) {
        setQuizCompleted(true);
    }
}, [state.userAnswers]);

console.log(state.userAnswers)


  const handleStart = async (userEmail) => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=15");
      const data = await response.json();
      const formattedQuestions = data.results.map((question) => ({
        ...question,
        choices: [...question.incorrect_answers, question.correct_answer].sort(
          () => Math.random() - 0.5
        ),
      }));
      setQuestions(formattedQuestions);
      setQuizStarted(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleTimeOut = () => {
    setQuizCompleted(true);
  };

  

  const nextQuestion = () => {
    if (state.currentQuestionIndex < questions.length - 1) {
      dispatch({
        type: "SET_CURRENT_QUESTION",
        payload: state.currentQuestionIndex + 1,
      });
    }
};


  const prevQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      dispatch({
        type: "SET_CURRENT_QUESTION",
        payload: state.currentQuestionIndex - 1,
      });
    }
  };

  if (!quizStarted) {
    return <StartPage onStart={handleStart} />;
  }

  if (quizCompleted) {
    return <ReportPage questions={questions} />;
  }

  return (
    <div className="app-container">
      <Timer onTimeOut={handleTimeOut} />
      <Question question={questions[state.currentQuestionIndex]} />
      <OverviewPanel questions={questions} />
      <div className="navigation-buttons">
        {state.currentQuestionIndex > 0 && (
          <button className="navigation-button" onClick={prevQuestion}>
            Previous
          </button>
        )}
        <button className="navigation-button" onClick={nextQuestion}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
