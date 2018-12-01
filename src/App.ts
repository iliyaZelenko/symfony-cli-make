import chalk from 'chalk'
import * as figlet from 'figlet'
import AbstractEntityStrategy from '~/entities/AbstractEntityStrategy'

export default class App {
  private entity: AbstractEntityStrategy

  public constructor (entity: AbstractEntityStrategy) {
    this.entity = entity
  }

  public execute () {
    drawLogo()

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
