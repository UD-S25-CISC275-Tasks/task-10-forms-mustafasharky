import React, { useState } from "react";
import { Button } from "react-bootstrap";

// Define holiday types
type Holiday =
    | "Christmas"
    | "Easter"
    | "Halloween"
    | "New Year"
    | "Thanksgiving";

// Map holidays to emojis
const holidayEmojis: Record<Holiday, string> = {
    Christmas: "🎄",
    Easter: "🐰",
    Halloween: "🎃",
    "New Year": "🎆",
    Thanksgiving: "🦃"
};

const alphabeticalOrder: Holiday[] = [
    "Christmas",
    "Easter",
    "Halloween",
    "New Year",
    "Thanksgiving"
];
const yearOrder: Holiday[] = [
    "New Year",
    "Easter",
    "Halloween",
    "Thanksgiving",
    "Christmas"
];

export function CycleHoliday(): React.JSX.Element {
    const [currentHoliday, setCurrentHoliday] = useState<Holiday>("New Year");

    const getNextHoliday = (current: Holiday, order: Holiday[]): Holiday => {
        const index = order.indexOf(current);
        return order[(index + 1) % order.length];
    };

    return (
        <div>
            <h2>Holiday: {holidayEmojis[currentHoliday]}</h2>
            <Button
                onClick={() => {
                    setCurrentHoliday(
                        getNextHoliday(currentHoliday, alphabeticalOrder)
                    );
                }}
            >
                Advance by Alphabet
            </Button>
            <Button
                onClick={() => {
                    setCurrentHoliday(
                        getNextHoliday(currentHoliday, yearOrder)
                    );
                }}
            >
                Advance by Year
            </Button>
        </div>
    );
}