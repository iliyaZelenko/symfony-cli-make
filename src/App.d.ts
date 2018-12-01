import AbstractEntityStrategy from '~/entities/AbstractEntityStrategy';
export default class App {
    private entity;
    constructor(entity: AbstractEntityStrategy);
    execute(): void;
}
