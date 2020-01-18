import puppeteer from 'puppeteer'
import { Browser } from 'puppeteer'
import Logger from '../logger/Logger'
import NullLogger from '../logger/NullLogger'

class PdfRenderer {
  private browser: Browser
  private logger: Logger

  public async start(): Promise<void> {
    this.browser = await puppeteer.launch()
    this.logger = new NullLogger()
  }

  public setLogger(logger: Logger): void {
    this.logger = logger
  }

  public async render(content: string): Promise<Buffer> {
    if (!this.browser || !this.browser.isConnected()) {
      await this.start()
    }

    const page = await this.browser.newPage()
    page.on('console', msg => {
      const message = `PAGE LOG:: ${msg.text()}`
      switch (msg.type()) {
        case 'error': {
          this.logger.error(message)
          break
        }
        case 'info': {
          this.logger.info(message)
          break
        }
        case 'warning': {
          this.logger.warn(message)
          break
        }
        default: {
          this.logger.log(message)
        }
      }
    })
    await page.setContent(content)

    const data = await page.pdf()

    await page.close()

    return data
  }

  public async stop(): Promise<void> {
    if (this.browser) {
      await this.browser.close()
    }
  }
}

export default PdfRenderer
