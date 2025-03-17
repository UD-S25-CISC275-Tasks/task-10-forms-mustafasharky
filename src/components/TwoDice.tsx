import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    const [dice1, setDice1] = useState<number>(1);
    const [dice2, setDice2] = useState<number>(2);

    let resultMessage = "";
    if (dice1 === dice2) {
        resultMessage = dice1 === 1 ? "Lose" : "Win";
    }

    return (
        <div>
            <div>
                <span data-testid="left-die">{dice1}</span>
                <span data-testid="right-die">{dice2}</span>
            </div>
            <div>
                <Button
                    onClick={() => {
                        setDice1(d6());
                    }}
                >
                    Roll Left
                </Button>
                <Button
                    onClick={() => {
                        setDice2(d6());
                    }}
                >
                    Roll Right
                </Button>
            </div>
            {resultMessage && <p>{resultMessage}</p>}
        </div>
    );
}
