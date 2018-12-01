import chalk from 'chalk'

interface QuestionsInterface {
  type: string
  name: string
  message: string
  choices?: object[]
  default?: any
  validate?: (answer: any) => boolean | string
}

export const questions: QuestionsInterface[] = [
  // TODO валидация для правил
  {
    type: 'input',
    name: 'savePath',
    message: `In which folder do you want to save (relatively to ${chalk.yellow('src')})?
  Script will generate ${chalk.yellow('namespace')} automatics.
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
]

export const lazyLoadedQuestions: QuestionsInterface[] = [
  {
    type: 'input',
    name: 'runtimeClassName',
    message: 'The name of your second class (Lazy-Loaded)?',
    default: 'AppRuntime'
  }
]

export const functionalityQuestions: QuestionsInterface[] = [
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
    validate (answer) {
      if (answer.length < 1) {
        return 'You must choose at least one item.'
      }

      return true
    }
  }
]

export const filterQuestions: QuestionsInterface[] = [
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
]

export const functionQuestions: QuestionsInterface[] = [
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
]
