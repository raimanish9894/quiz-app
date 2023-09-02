import React, { useState, useEffect } from 'react';
import { useQuiz } from './QuizContext';
import "../App.css";

const Question = ({ question }) => {
    const { state, dispatch } = useQuiz();
    const [selectedChoice, setSelectedChoice] = useState(null);

    useEffect(() => {
        const userAnswer = state.userAnswers[state.currentQuestionIndex];
        if (userAnswer) {
            setSelectedChoice(userAnswer.choice);
        } else {
            setSelectedChoice(null);
        }
    }, [question, state.currentQuestionIndex, state.userAnswers]);

    const handleChoiceClick = (choice) => {
        setSelectedChoice(choice);
        const feedbackValue = choice === question.correct_answer ? 'correct' : 'incorrect';
        dispatch({ type: 'SET_ANSWER', payload: { choice, feedback: feedbackValue } });
        
    };

    return (
        <div className="question-wrapper">
            <div className="question-box">
                <p className="question-text">
                    <span>Question No: {state.currentQuestionIndex + 1} - </span>
                    <span dangerouslySetInnerHTML={{ __html: question.question }}></span>
                </p>
            </div>
            <div className="choices-container">
                {question.choices.map((choice, index) => (
                    <button 
                        key={index}
                        onClick={() => handleChoiceClick(choice)} 
                        className={`choice-button ${selectedChoice === choice ? (choice === question.correct_answer ? 'correct' : 'incorrect') : ''}`}
                        disabled={!!state.userAnswers[state.currentQuestionIndex]}
                    >
                        <span dangerouslySetInnerHTML={{ __html: choice }}></span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
