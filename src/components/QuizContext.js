import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  currentQuestionIndex: 0,
  userAnswers: [],
  visitedQuestions: [],
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SET_ANSWER":
      const newUserAnswers = [...state.userAnswers];
      newUserAnswers[state.currentQuestionIndex] = action.payload;
      return { ...state, userAnswers: newUserAnswers };
    case "SET_CURRENT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: action.payload,
        visitedQuestions: state.visitedQuestions.includes(action.payload)
          ? state.visitedQuestions
          : [...state.visitedQuestions, action.payload],
      };
    default:
      return state;
  }
}

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
