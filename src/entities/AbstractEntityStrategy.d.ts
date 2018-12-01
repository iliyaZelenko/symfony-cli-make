export default abstract class AbstractEntityStrategy {
    abstract execute(): any;
    protected abstract interactive(): any;
    protected abstract save(...argumentsList: any[]): any;
    protected compileTemplate(source: any, context: any): string;
    protected readTemplate(path: any): Promise<any>;
    protected saveTemplate({ saveToDir, fileSave, contents }: {
        saveToDir: any;
        fileSave: any;
        contents: any;
    }): Promise<any>;
    protected getWriteDir(path: string): string;
}
