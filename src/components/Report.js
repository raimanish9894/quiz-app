import React from "react";
import { useQuiz } from "./QuizContext";
import "../App.css";

const ReportPage = ({ questions }) => {
  const { state } = useQuiz();

  return (
    <div className="report-page">
      <h2>Quiz Report</h2>
      {questions.map((q, index) => (
        <div key={index} className="report-item">
          <p>
            <strong>Question {index + 1}:</strong>
            <span dangerouslySetInnerHTML={{ __html: q.question }}></span>
          </p>
          <p>
            <strong>Your Answer:</strong>
            <span
              dangerouslySetInnerHTML={{
                __html: state.userAnswers[index]?.choice || "Not answered",
              }}
            ></span>
          </p>
          <p>
            <strong>Correct Answer:</strong>
            <span dangerouslySetInnerHTML={{ __html: q.correct_answer }}></span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReportPage;
