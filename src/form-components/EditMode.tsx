import React, { useState } from "react";
import {
    Form,
    FormCheck,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";

export function EditMode(): React.JSX.Element {
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState("Your Name");
    const [isStudent, setIsStudent] = useState(true);

    return (
        <div>
            <Form>
                <FormCheck
                    type="switch"
                    id="edit-mode-switch"
                    label="Edit Mode"
                    checked={isEditMode}
                    onChange={() => {
                        setIsEditMode(!isEditMode);
                    }}
                />
            </Form>
            {isEditMode ?
                <Form>
                    <FormGroup>
                        <FormLabel>Name:</FormLabel>
                        <FormControl
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormCheck
                            type="checkbox"
                            id="student-checkbox"
                            label="Student"
                            checked={isStudent}
                            onChange={() => {
                                setIsStudent(!isStudent);
                            }}
                        />
                    </FormGroup>
                </Form>
            :   <p>
                    {name} is {isStudent ? "a student" : "not a student"}.
                </p>
            }
        </div>
    );
}
