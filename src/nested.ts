import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter((question: Question) => question.published);
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    return questions.filter(
        (question: Question) =>
            question.body.length !== 0 ||
            question.expected.length !== 0 ||
            question.options.length !== 0,
    );
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    return questions.find((question: Question) => question.id == id) || null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter((question: Question) => question.id != id);
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    let names: string[] = [];

    questions.forEach(
        (question: Question) => (names = [...names, question.name]),
    );
    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    let total: number = 0;

    questions.forEach((question: Question) => (total += question.points));
    return total;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    let total: number = 0;

    questions.forEach((question: Question) => {
        if (question.published) {
            total += question.points;
        }
    });

    return total;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let csv: string = "id,name,options,points,published";

    questions.forEach((question: Question) => {
        csv +=
            "\n" +
            String(question.id) +
            "," +
            question.name +
            "," +
            question.options.length +
            "," +
            question.points +
            "," +
            String(question.published);
    });

    return csv;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    let answers: Answer[] = [];

    questions.forEach((question: Question) => {
        answers = [
            ...answers,
            {
                questionId: question.id,
                text: "",
                submitted: false,
                correct: false,
            },
        ];
    });

    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return questions.map((question: Question) => {
        return { ...question, published: true };
    });
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (questions.length === 0) {
        return true;
    }

    let currentType: string = questions[0].type;
    let isSame: boolean = true;

    questions.forEach((question: Question) => {
        if (question.type !== currentType && isSame) {
            isSame = false;
        }
    });

    return isSame;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    let foundQuestion = questions.findIndex(
        (question: Question) => question.id === targetId,
    );
    let foundQuestionData = questions[foundQuestion];
    let firstHalf = questions.slice(0, foundQuestion);
    firstHalf = [...firstHalf, { ...foundQuestionData, name: newName }];

    let secondHalf = questions.slice(foundQuestion + 1);
    firstHalf = [...firstHalf, ...secondHalf];
    return firstHalf;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    let foundQuestion = questions.findIndex(
        (question: Question) => question.id === targetId,
    );
    let foundQuestionData = questions[foundQuestion];
    let firstHalf = questions.slice(0, foundQuestion);
    if (
        foundQuestionData.type === "multiple_choice_question" &&
        foundQuestionData.type !== newQuestionType
    ) {
        firstHalf = [
            ...firstHalf,
            { ...foundQuestionData, type: newQuestionType, options: [] },
        ];
    } else {
        firstHalf = [
            ...firstHalf,
            { ...foundQuestionData, type: newQuestionType },
        ];
    }

    let secondHalf = questions.slice(foundQuestion + 1);
    firstHalf = [...firstHalf, ...secondHalf];
    return firstHalf;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    let foundQuestion = questions.findIndex(
        (question: Question) => question.id === targetId,
    );
    let foundQuestionData = questions[foundQuestion];
    let firstHalf = questions.slice(0, foundQuestion);
    if (targetOptionIndex == -1) {
        firstHalf = [
            ...firstHalf,
            {
                ...foundQuestionData,
                options: [...foundQuestionData.options, newOption],
            },
        ];
    } else {
        firstHalf = [
            ...firstHalf,
            { ...foundQuestionData, options: [...foundQuestionData.options] },
        ];
        firstHalf[foundQuestion].options[targetOptionIndex] = newOption;
    }

    let secondHalf = questions.slice(foundQuestion + 1);
    firstHalf = [...firstHalf, ...secondHalf];
    return firstHalf;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    let foundQuestion = questions.findIndex(
        (question: Question) => question.id === targetId,
    );
    let foundQuestionData = questions[foundQuestion];
    let firstHalf = questions.slice(0, foundQuestion);
    firstHalf = [
        ...firstHalf,
        { ...foundQuestionData },
        duplicateQuestion(newId, foundQuestionData),
    ];

    let secondHalf = questions.slice(foundQuestion + 1);
    firstHalf = [...firstHalf, ...secondHalf];
    return firstHalf;
}
