import pug from 'pug'
import Template from './Template'
import ValidionError from './ValidionError'

class HtmlRenderer {
  private readonly templates: { [key: string]: Template }

  constructor() {
    this.templates = {}
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

  public render(key: string, data: object = {}): string {
    const template = this.getTemplate(key)

    const errors = template.validate(data)

    if (errors.length) {
      throw new ValidionError(`Template with key "${key}" is not valid.`, errors)
    }

    return pug.renderFile(template.getPath(), { cache: true, ...data })
  }
}

export default HtmlRenderer
