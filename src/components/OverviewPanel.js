import React from 'react';
import { useQuiz } from './QuizContext';
import "../App.css";

const OverviewPanel = ({ questions }) => {
    const { state, dispatch } = useQuiz();

    const handleQuestionClick = (index) => {
        dispatch({ type: 'SET_CURRENT_QUESTION', payload: index });
    };

    return (
        <div className="overview-box">
            <div className="overview-container">
                {questions.map((_, index) => (
                    <span 
                        key={index} 
                        className={`overview-item 
                            ${index === state.currentQuestionIndex ? 'active' : ''} 
                            ${state.visitedQuestions.includes(index) ? 'visited' : ''}
                            ${state.userAnswers[index] ? 'answered' : ''}`}
                        onClick={() => handleQuestionClick(index)}
                    >
                        {index + 1}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default OverviewPanel;
