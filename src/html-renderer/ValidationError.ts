import { ErrorObject } from 'ajv'

class ValidationError extends Error {
  public errors: Array<ErrorObject>

  constructor(message: string, errors: Array<ErrorObject>) {
    super(message)
    this.errors = errors
  }
}

export default ValidationError
