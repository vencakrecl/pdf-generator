import Ajv, { ValidateFunction, ErrorObject } from 'ajv'

class Template {
  private readonly key: string
  private readonly path: string
  private readonly ajvValidate: ValidateFunction

  /**
   * @param key
   * @param path
   * @param schema
   */
  constructor(key: string, path: string, schema: object = {}) {
    this.key = key
    this.path = path
    const ajv = new Ajv()
    this.ajvValidate = ajv.compile(schema)
  }

  public getKey(): string {
    return this.key
  }

  public getPath(): string {
    return this.path
  }

  public validate(data: object = {}): Array<ErrorObject> {
    const isValid = this.ajvValidate(data)

    if (!isValid) {
      return this.ajvValidate.errors
    }

    return []
  }
}

export default Template
