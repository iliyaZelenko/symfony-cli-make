import AbstractEntityStrategy from '~/entities/AbstractEntityStrategy';
import AnswersInterface from '~/entities/twig/extensions/AnswersInterface';
export default class TwigExtensionStrategy extends AbstractEntityStrategy {
    protected readonly TEMPLATES_PATH: string;
    protected readonly TEMPLATES_PATH_LAZY_LOADED: string;
    protected readonly MAIN_TEMPLATE: string;
    protected readonly LAZY_LOADED_TEMPLATES: {
        [key: string]: string;
    };
    execute(): Promise<void>;
    /**
     * Спрашивает у пользователя
     * @return {Promise<object>} promise with answers
     */
    protected interactive(): Promise<AnswersInterface>;
    protected save(answers: AnswersInterface): Promise<void>;
    protected readCompileAndSaveTemplate({ pathSource, saveToDir, fileSave, compileContext }: {
        pathSource: any;
        saveToDir: any;
        fileSave: any;
        compileContext: any;
    }): Promise<any>;
}
