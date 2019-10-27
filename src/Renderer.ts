import pug from 'pug'
import Template from './Template'

class Renderer {
  private readonly templates: { [key: string]: Template }

  constructor() {
    this.templates = {}
  }

  /**
   * @param {Template} template
   */
  public addTemplate(template: Template): void {
    if (this.templates[template.getKey()]) {
      throw new Error(`Template with key "${template.getKey()}" already exists.`)
    }

    this.templates[template.getKey()] = template
  }

  /**
   * @param {string} key
   *
   * @returns {Template}
   */
  public getTemplate(key: string): Template {
    if (!this.templates[key]) {
      throw new Error(`Template with key "${key}" does not exists.`)
    }

    return this.templates[key]
  }

  /**
   * @returns {Array<string>}
   */
  public getKeys(): Array<string> {
    return Object.keys(this.templates)
  }

  /**
   * @param {string} key
   * @param {Object} data
   *
   * @returns {string}
   */
  public render(key: string, data: Record<string, any>): string {
    const template = this.getTemplate(key)

    const errors = template.validate(data)

    // @todo return errors
    if (errors.length) {
      throw new Error(`Template with key "${key}" is not valid. Errors: ${errors}`)
    }

    // @todo catch error
    return pug.renderFile(template.getPath(), { cache: true, ...data })
  }
}

export default Renderer
