import Ajv, { ErrorObject, ValidateFunction } from 'ajv'

class Template {
  private readonly id: string
  private readonly path: string
  private readonly ajvValidate: ValidateFunction

  /**
   * @param id
   * @param path
   * @param schema
   */
  constructor(id: string, path: string, schema: object = {}) {
    this.id = id
    this.path = path
    const ajv = new Ajv()
    this.ajvValidate = ajv.compile(schema)
  }

  public getId(): string {
    return this.id
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
