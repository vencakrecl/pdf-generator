import pug from 'pug'
import Template from './Template'
import { ErrorObject } from 'ajv'

class Renderer {
  private readonly templates: { [key: string]: Template }
  private validationErrors: Array<ErrorObject>

  constructor() {
    this.templates = {}
    this.validationErrors = []
  }

  public addTemplate(template: Template): void {
    if (this.templates[template.getKey()]) {
      throw new Error(`Template with key "${template.getKey()}" already exists.`)
    }

    this.templates[template.getKey()] = template
  }

  public getTemplate(key: string): Template {
    if (!this.templates[key]) {
      throw new Error(`Template with key "${key}" does not exists.`)
    }

    return this.templates[key]
  }

  public getKeys(): Array<string> {
    return Object.keys(this.templates)
  }

  public getValidationErrors(): Array<ErrorObject> {
    return this.validationErrors
  }

  public render(key: string, data: object = {}): string {
    const template = this.getTemplate(key)

    const errors = template.validate(data)

    if (errors.length) {
      this.validationErrors = errors
      throw new Error(`Template with key "${key}" is not valid.`)
    }

    return pug.renderFile(template.getPath(), { cache: true, ...data })
  }
}

export default Renderer
