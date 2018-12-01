import Handlebars from 'handlebars'
import * as fs from 'fs-extra'
import { join } from 'path'
import { covertInputPath } from '~/tools/helpers'

export default abstract class AbstractEntityStrategy {

  // Интересный момент: в TS конструктор в абстрактном классе может быть protected, в PHP он всегда должен быть public
  // protected constructor () {
  //   //
  // }

  public abstract execute ()
  protected abstract interactive ()
  protected abstract save (...argumentsList: any[])

  protected compileTemplate (source, context): string {
    const template = Handlebars.compile(source)

    return template(context)
  }

  protected async readTemplate (path) {
    const source = await fs.readFile(path, 'utf8')

    return source
  }

  protected async saveTemplate ({ saveToDir, fileSave, contents }) {
    // это создаст директорию если её не существует
    await fs.mkdirp(saveToDir)

    return fs.writeFile(join(saveToDir, fileSave) , contents)
  }

  protected getWriteDir (path: string): string {
    const userProjectDir = process.cwd()
    path = covertInputPath(path)

    return join(userProjectDir, 'src', path)
  }
}
