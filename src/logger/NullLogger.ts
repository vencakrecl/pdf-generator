import Logger from './Logger'

class NullLogger implements Logger {
  // @ts-ignore
  log(message?: string, ...args: unknown[]): void {
    // null function
  }
  // @ts-ignore
  info(message?: string, ...args: unknown[]): void {
    // null function
  }
  // @ts-ignore
  warn(message?: string, ...args: unknown[]): void {
    // null function
  }
  // @ts-ignore
  error(message?: string, ...args: unknown[]): void {
    // null function
  }
}

export default NullLogger
