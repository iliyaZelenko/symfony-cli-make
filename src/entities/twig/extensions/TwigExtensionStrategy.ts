import * as inquirer from 'inquirer'
import chalk from 'chalk'
import { join } from 'path'

import AbstractEntityStrategy from '~/entities/AbstractEntityStrategy'
import {
  filterQuestions,
  functionalityQuestions, functionQuestions,
  lazyLoadedQuestions,
  questions
} from '~/entities/twig/extensions/questions'
import AnswersInterface from '~/entities/twig/extensions/AnswersInterface'
import { covertPathToNamespace, getSrcDir } from '~/tools/helpers'

// pattern Strategy
export default class TwigExtensionStrategy extends AbstractEntityStrategy {

  protected readonly TEMPLATES_PATH: string = join(getSrcDir(), 'entities', 'twig', 'extensions', 'templates')
  protected readonly TEMPLATES_PATH_LAZY_LOADED: string = join(this.TEMPLATES_PATH, 'lazyLoaded')
  protected readonly MAIN_TEMPLATE: string = 'main.php.handlebars'
  protected readonly LAZY_LOADED_TEMPLATES: {[key: string]: string} = {
    main: 'main.php.handlebars',
    runtime: 'runtime.php.handlebars'
  }

  // public constructor () {
  //   super()
  // }

  public async execute () {
    try {
      const answers: AnswersInterface = await this.interactive()
      await this.save(answers)

      console.log(chalk.green('Operation completed successfully!'))
    } catch ({ message }) {
      console.error(chalk.red(`Error: ${message}.`))
    }
  }

  /**
   * Спрашивает у пользователя
   * @return {Promise<object>} promise with answers
   */
  protected async interactive (): Promise<AnswersInterface> {
    let answers = await inquirer.prompt(questions)
    const { savePath, lazyLoaded } = answers
    const namespace = covertPathToNamespace(savePath)

    let lazyLoadedAnswers

    if (lazyLoaded) {
      lazyLoadedAnswers = await inquirer.prompt(lazyLoadedQuestions)
    }

    const {
      functionality
    }: {
      functionality: AnswersInterface['functionality']
    } = await inquirer.prompt(functionalityQuestions)
    const concreteFunctionalityQuestions: any[] = []

    if (functionality.includes('Filter')) {
      concreteFunctionalityQuestions.push(...filterQuestions)
    }
    if (functionality.includes('Function')) {
      concreteFunctionalityQuestions.push(...functionQuestions)
    }
    if (!concreteFunctionalityQuestions.length) {
      // бывает select в cli плохо работает
      console.error(chalk.red('Looks like you haven\'t chosen an option.'))
    }
    const functionalityAnswers = await inquirer.prompt(concreteFunctionalityQuestions)

    answers = { ...answers, ...lazyLoadedAnswers, ...functionalityAnswers }

    // console.log(JSON.stringify(answers, null, '  '))

    return {
      ...answers,
      namespace
    }
  }

  protected async save (answers: AnswersInterface) {
    const { savePath, lazyLoaded, className, runtimeClassName } = answers
    const saveToDir = this.getWriteDir(savePath)
    const fileExt = '.php'

    const performTemplate = async (pathSource: string, fileSave: string): Promise<any> => {
      return this.readCompileAndSaveTemplate({
        compileContext: answers,
        fileSave: fileSave + fileExt,
        saveToDir,
        pathSource
      })
    }

    if (lazyLoaded) {
      const mainTemplate = join(this.TEMPLATES_PATH_LAZY_LOADED, this.LAZY_LOADED_TEMPLATES.main)
      const runtimeTemplate = join(this.TEMPLATES_PATH_LAZY_LOADED, this.LAZY_LOADED_TEMPLATES.runtime)

      await performTemplate(mainTemplate, className)
      await performTemplate(runtimeTemplate, runtimeClassName)
    } else {
      const mainTemplate = join(this.TEMPLATES_PATH, this.MAIN_TEMPLATE)

      await performTemplate(mainTemplate, className)
    }
  }

  protected async readCompileAndSaveTemplate ({ pathSource, saveToDir, fileSave, compileContext }) {
    const template = await this.readTemplate(pathSource)
    const contents = this.compileTemplate(template, compileContext)

    return this.saveTemplate({saveToDir, fileSave, contents})
  }
}
