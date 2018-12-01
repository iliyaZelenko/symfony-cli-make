export default interface AnswersInterface {
    savePath: string;
    lazyLoaded: boolean;
    className: string;
    runtimeClassName: string;
    functionality: ['Filter'?, 'Function'?];
    filterName: string;
    functionName: string;
}
