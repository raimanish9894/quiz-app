import React from 'react';
import "../App.css"

const StartPage = ({ onStart }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        onStart(email);
    };

    return (
        <div className="start-container">
            <h1>Quiz Application</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" required placeholder="Enter your email" className="start-input" />
                <button type="submit" className="start-button">Start Quiz</button>
            </form>
        </div>
    );
};

export default StartPage;
