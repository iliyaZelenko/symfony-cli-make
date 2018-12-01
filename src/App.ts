import chalk from 'chalk'
import * as figlet from 'figlet'
import AbstractEntityStrategy from '~/entities/AbstractEntityStrategy'
import { getSrcDir } from '~/tools/helpers'

export default class App {
  private entity: AbstractEntityStrategy

  public constructor (entity: AbstractEntityStrategy) {
    this.entity = entity
  }

  public execute () {
    drawLogo()

    console.log(
      chalk.gray(`\nYour project src folder: ${getSrcDir()}\n`)
    )

    this.entity.execute()
  }
}

/**
 * Рисует лого
 *
 * @return {void}
 */
function drawLogo (): void {
  console.log(
    chalk.blue(figlet.textSync('TwigExt', { horizontalLayout: 'full' }))
  )
}
