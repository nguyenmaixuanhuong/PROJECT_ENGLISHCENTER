import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialTime, handleSubmit }) => {
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem('timeLeft');
        const savedTimestamp = localStorage.getItem('timestamp');

        if (JSON.parse(savedTime) && JSON.parse(savedTimestamp)) {
            const elapsedTime = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
            const updatedTimeLeft = parseInt(savedTime, 10) - elapsedTime;
            return updatedTimeLeft > 0 ? updatedTimeLeft : 0;
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
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        // Save the current timeLeft and timestamp to localStorage
        localStorage.setItem('timeLeft', timeLeft);
        localStorage.setItem('timestamp', Date.now());

        return () => clearInterval(timerId);
    }, [timeLeft]);

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
