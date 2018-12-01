interface QuestionsInterface {
    type: string;
    name: string;
    message: string;
    choices?: object[];
    default?: any;
    validate?: (answer: any) => boolean | string;
}
export declare const questions: QuestionsInterface[];
export declare const lazyLoadedQuestions: QuestionsInterface[];
export declare const functionalityQuestions: QuestionsInterface[];
export declare const filterQuestions: QuestionsInterface[];
export declare const functionQuestions: QuestionsInterface[];
export {};
