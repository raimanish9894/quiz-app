import React, { useState, useEffect } from 'react';

const Timer = ({ onTimeOut }) => {
    const [timeLeft, setTimeLeft] = useState(30 * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    onTimeOut();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onTimeOut]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="timer">
            {minutes}:{seconds < 10 ? '0' + seconds : seconds}
        </div>
    );
};

export default Timer;
