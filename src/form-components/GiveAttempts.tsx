import React, { useState } from "react";

export function GiveAttempts(): React.JSX.Element {
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [requestAmount, setRequestAmount] = useState("");

    const handleUseAttempt = () => {
        if (attemptsLeft > 0) {
            setAttemptsLeft(attemptsLeft - 1);
        }
    };

    const handleGainAttempts = () => {
        const amount = parseInt(requestAmount);
        if (!isNaN(amount) && amount > 0) {
            setAttemptsLeft(attemptsLeft + amount);
        }
    };

    return (
        <div>
            <h3>Give Attempts</h3>
            <p>Attempts Left: {attemptsLeft}</p>
            <input
                type="number"
                value={requestAmount}
                onChange={(e) => {
                    setRequestAmount(e.target.value);
                }}
                placeholder="Enter attempts to gain"
            />
            <button onClick={handleUseAttempt} disabled={attemptsLeft === 0}>
                Use
            </button>
            <button onClick={handleGainAttempts}>Gain</button>
        </div>
    );
}
