import Logger from './Logger'

class NullLogger implements Logger {
  log(message?: string, ...args: unknown[]): void {
    // null function
  }
  info(message?: string, ...args: unknown[]): void {
    // null function
  }
  warn(message?: string, ...args: unknown[]): void {
    // null function
  }
  error(message?: string, ...args: unknown[]): void {
    // null function
  }
}

export default NullLogger
