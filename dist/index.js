#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const App_ts_1 = __webpack_require__(1);
const TwigExtensionStrategy_1 = __webpack_require__(7);
new App_ts_1.default(new TwigExtensionStrategy_1.default()).execute();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __webpack_require__(2);
const figlet = __webpack_require__(3);
const helpers_1 = __webpack_require__(4);
class App {
    constructor(entity) {
        this.entity = entity;
    }
    execute() {
        drawLogo();
        console.log(chalk_1.default.gray(`\nYour project src folder: ${helpers_1.getSrcDir()}\n`));
        this.entity.execute();
    }
}
exports.default = App;
/**
 * Рисует лого
 *
 * @return {void}
 */
function drawLogo() {
    console.log(chalk_1.default.blue(figlet.textSync('TwigExt', { horizontalLayout: 'full' })));
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("figlet");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __webpack_require__(5);
const fs = __webpack_require__(6);
/**
 * Конвертирует путь в namespace
 *
 * @param {string} path
 * @param {string} prefix
 * @return {string}
 */
function covertPathToNamespace(path, prefix = 'App\\') {
    const separator = path.includes('/') ? '\\/' : '\\\\';
    const re = new RegExp(separator, 'gi');
    return prefix + path.replace(re, '\\');
}
exports.covertPathToNamespace = covertPathToNamespace;
/**
 * Конвертирует введенный путь в понятный для Node.js формат.
 *
 * @param {string} path
 * @return {string} joined path by OC separator
 */
function covertInputPath(path) {
    // const separator: string = path.includes('/') ? '/' : '\\'
    // const separatedPath: string[] = path.split(separator)
    // оказывается есть такая удобная ф-я
    return path_1.normalize(path); // join(...separatedPath)
}
exports.covertInputPath = covertInputPath;
/**
 * Возвращает путь к папке src.
 * Рекурсивно поднимается по директория вверх.
 *
 * @param {string} srcFolder name of src folder
 * @param {string} startPath
 * @return {string} "src" folder path
 */
function getSrcDir(srcFolder = 'src', startPath = __dirname) {
    const parentPath = path_1.normalize(startPath + '/..');
    if (startPath === parentPath) {
        throw Error('Could not find folder.');
    }
    // если папка этого путя совпадает с srcFolder
    if (path_1.basename(startPath) === srcFolder) {
        return startPath;
    }
    // если этот путь содержит srcFolder (для оптимизации можно написать еще проверку для parentPath в отдельном if)
    if (fs.pathExistsSync(path_1.join(startPath, srcFolder))) {
        return path_1.join(startPath, srcFolder);
    }
    return getSrcDir(srcFolder, parentPath);
}
exports.getSrcDir = getSrcDir;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = __webpack_require__(8);
const chalk_1 = __webpack_require__(2);
const path_1 = __webpack_require__(5);
const AbstractEntityStrategy_1 = __webpack_require__(9);
const questions_1 = __webpack_require__(11);
const helpers_1 = __webpack_require__(4);
// pattern Strategy
class TwigExtensionStrategy extends AbstractEntityStrategy_1.default {
    constructor() {
        super(...arguments);
        this.TEMPLATES_PATH = path_1.join(helpers_1.getSrcDir(), 'entities', 'twig', 'extensions', 'templates');
        this.TEMPLATES_PATH_LAZY_LOADED = path_1.join(this.TEMPLATES_PATH, 'lazyLoaded');
        this.MAIN_TEMPLATE = 'main.php.handlebars';
        this.LAZY_LOADED_TEMPLATES = {
            main: 'main.php.handlebars',
            runtime: 'runtime.php.handlebars'
        };
    }
    // public constructor () {
    //   super()
    // }
    async execute() {
        try {
            const answers = await this.interactive();
            await this.save(answers);
            console.log(chalk_1.default.green('Operation completed successfully!'));
        }
        catch ({ message }) {
            console.error(chalk_1.default.red(`Error: ${message}.`));
        }
    }
    /**
     * Спрашивает у пользователя
     * @return {Promise<object>} promise with answers
     */
    async interactive() {
        let answers = await inquirer.prompt(questions_1.questions);
        const { savePath, lazyLoaded } = answers;
        const namespace = helpers_1.covertPathToNamespace(savePath);
        let lazyLoadedAnswers;
        if (lazyLoaded) {
            lazyLoadedAnswers = await inquirer.prompt(questions_1.lazyLoadedQuestions);
        }
        const { functionality } = await inquirer.prompt(questions_1.functionalityQuestions);
        const concreteFunctionalityQuestions = [];
        if (functionality.includes('Filter')) {
            concreteFunctionalityQuestions.push(...questions_1.filterQuestions);
        }
        if (functionality.includes('Function')) {
            concreteFunctionalityQuestions.push(...questions_1.functionQuestions);
        }
        if (!concreteFunctionalityQuestions.length) {
            // бывает select в cli плохо работает
            console.error(chalk_1.default.red('Looks like you haven\'t chosen an option.'));
        }
        const functionalityAnswers = await inquirer.prompt(concreteFunctionalityQuestions);
        answers = { ...answers, ...lazyLoadedAnswers, ...functionalityAnswers };
        // console.log(JSON.stringify(answers, null, '  '))
        return {
            ...answers,
            namespace
        };
    }
    async save(answers) {
        const { savePath, lazyLoaded, className, runtimeClassName } = answers;
        const saveToDir = this.getWriteDir(savePath);
        const fileExt = '.php';
        const performTemplate = async (pathSource, fileSave) => {
            return this.readCompileAndSaveTemplate({
                compileContext: answers,
                fileSave: fileSave + fileExt,
                saveToDir,
                pathSource
            });
        };
        if (lazyLoaded) {
            const mainTemplate = path_1.join(this.TEMPLATES_PATH_LAZY_LOADED, this.LAZY_LOADED_TEMPLATES.main);
            const runtimeTemplate = path_1.join(this.TEMPLATES_PATH_LAZY_LOADED, this.LAZY_LOADED_TEMPLATES.runtime);
            await performTemplate(mainTemplate, className);
            await performTemplate(runtimeTemplate, runtimeClassName);
        }
        else {
            const mainTemplate = path_1.join(this.TEMPLATES_PATH, this.MAIN_TEMPLATE);
            await performTemplate(mainTemplate, className);
        }
    }
    async readCompileAndSaveTemplate({ pathSource, saveToDir, fileSave, compileContext }) {
        const template = await this.readTemplate(pathSource);
        const contents = this.compileTemplate(template, compileContext);
        return this.saveTemplate({ saveToDir, fileSave, contents });
    }
}
exports.default = TwigExtensionStrategy;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("inquirer");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __webpack_require__(10);
const fs = __webpack_require__(6);
const path_1 = __webpack_require__(5);
const helpers_1 = __webpack_require__(4);
class AbstractEntityStrategy {
    compileTemplate(source, context) {
        const template = handlebars_1.default.compile(source);
        return template(context);
    }
    async readTemplate(path) {
        const source = await fs.readFile(path, 'utf8');
        return source;
    }
    async saveTemplate({ saveToDir, fileSave, contents }) {
        // это создаст директорию если её не существует
        await fs.mkdirp(saveToDir);
        return fs.writeFile(path_1.join(saveToDir, fileSave), contents);
    }
    getWriteDir(path) {
        const userProjectDir = process.cwd();
        path = helpers_1.covertInputPath(path);
        return path_1.join(userProjectDir, 'src', path);
    }
}
exports.default = AbstractEntityStrategy;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __webpack_require__(2);
exports.questions = [
    // TODO валидация для правил
    {
        type: 'input',
        name: 'savePath',
        message: `In which folder do you want to save (relatively to ${chalk_1.default.yellow('src')})?
  Script will generate ${chalk_1.default.yellow('namespace')} automatics.
 `,
        default: 'Twig'
    },
    {
        type: 'confirm',
        name: 'lazyLoaded',
        message: 'Create a Lazy-Loaded Extension (two classes are used)?',
        default: false
    },
    {
        type: 'input',
        name: 'className',
        message: 'The name of your Extension class?',
        default: 'AppExtension'
    }
];
exports.lazyLoadedQuestions = [
    {
        type: 'input',
        name: 'runtimeClassName',
        message: 'The name of your second class (Lazy-Loaded)?',
        default: 'AppRuntime'
    }
];
exports.functionalityQuestions = [
    {
        type: 'checkbox',
        message: 'What functionality will be included?',
        name: 'functionality',
        choices: [
            // new inquirer.Separator(' = The Functionality = '),
            {
                name: 'Filter',
                checked: true
            },
            {
                name: 'Function',
                checked: true
            },
            {
                name: 'Operator',
                disabled: 'no support yet'
            },
            {
                name: 'Test',
                disabled: 'no support yet'
            }
        ],
        validate(answer) {
            if (answer.length < 1) {
                return 'You must choose at least one item.';
            }
            return true;
        }
    }
];
exports.filterQuestions = [
    {
        type: 'input',
        name: 'filterName',
        message: 'The name of your filter?',
        default: 'myFilter'
    },
    {
        type: 'input',
        name: 'filterMethod',
        message: 'The method of your filter?',
        default: 'myFilter'
    }
];
exports.functionQuestions = [
    {
        type: 'input',
        name: 'functionName',
        message: 'The name of your function?',
        default: 'myFunction'
    },
    {
        type: 'input',
        name: 'functionMethod',
        message: 'The method of your function?',
        default: 'myFunction'
    }
];


/***/ })
/******/ ]);