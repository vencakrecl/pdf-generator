import Ajv, { ErrorObject, ValidateFunction } from 'ajv'

class Template {
  private readonly id: string
  private readonly path: string
  private readonly schema: Record<string, unknown> = {}
  private readonly ajvValidate: ValidateFunction

  /**
   * @param id
   * @param path
   * @param schema
   */
  constructor(id: string, path: string, schema: Record<string, unknown> = {}) {
    this.id = id
    this.path = path
    this.schema = schema
    const ajv = new Ajv()
    this.ajvValidate = ajv.compile(this.schema)
  }

  public getId(): string {
    return this.id
  }

  public getPath(): string {
    return this.path
  }

  public getSchema(): Record<string, unknown> {
    return this.schema
  }

  public validate(data: Record<string, unknown> = {}): Array<ErrorObject> {
    const isValid = this.ajvValidate(data)

    if (!isValid) {
      return this.ajvValidate.errors
    }

    return []
  }
}

export default Template
