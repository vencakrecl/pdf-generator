import { ErrorObject } from 'ajv'

class ValidionError extends Error {
  public errors: Array<ErrorObject>

  constructor(message: string, errors: Array<ErrorObject>) {
    super(message)
    this.errors = errors
  }
}

export default ValidionError
