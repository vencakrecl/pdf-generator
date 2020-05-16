import fs from 'fs'
import Template from './Template'
import path from 'path'
import Logger from '../logger/Logger'
import NullLogger from '../logger/NullLogger'

class TemplateLoader {
  private readonly templateName: string = 'template.pug'
  private readonly schemaName: string = 'schema.json'
  private readonly dirPath: string
  private logger: Logger

  constructor(dirPath: string) {
    this.dirPath = dirPath
    this.logger = new NullLogger()
  }

  public setLogger(logger: Logger): void {
    this.logger = logger
  }

  load(): Template[] {
    const dirs = fs.readdirSync(this.dirPath, 'utf8')

    const templates: Template[] = []
    dirs.forEach((key) => {
      const templatePath = path.join(this.dirPath, key, this.templateName)
      const schemaPath = path.join(this.dirPath, key, this.schemaName)

      if (!fs.existsSync(templatePath)) {
        this.logger.warn(`Template "${templatePath}" does not exists.`)

        return
      }

      let schema = {}
      if (!fs.existsSync(schemaPath)) {
        this.logger.info(`Schema "${schemaPath}" does not exists (not required).`)
      } else {
        schema = JSON.parse(fs.readFileSync(schemaPath).toString())
      }

      templates.push(new Template(key, templatePath, schema))
    })

    return templates
  }
}

export default TemplateLoader
