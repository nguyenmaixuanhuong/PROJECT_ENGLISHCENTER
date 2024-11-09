import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialTime, handleSubmit }) => {
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem('timeLeft');
        const savedTimestamp = localStorage.getItem('timestamp');

        if (savedTimestamp && savedTime) {
            const elapsedTime = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
            const updatedTimeLeft = parseInt(savedTime, 10) - elapsedTime;
            return updatedTimeLeft > 0 ? updatedTimeLeft : initialTime;
        }
        return initialTime;
    });

    useEffect(() => {
        if (timeLeft <= 0) {
            localStorage.removeItem('timeLeft');
            localStorage.removeItem('timestamp');
            handleSubmit();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerId);
                    localStorage.removeItem('timeLeft');
                    localStorage.removeItem('timestamp');
                    handleSubmit();
                    return 0;
                }
                const newTime = prevTime - 1;
                localStorage.setItem('timeLeft', newTime);
                localStorage.setItem('timestamp', Date.now());
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, handleSubmit]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <div>
            <h1>{formatTime(timeLeft)}</h1>
        </div>
    );
};

export default CountdownTimer;
