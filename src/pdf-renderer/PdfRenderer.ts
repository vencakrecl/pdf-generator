import puppeteer from 'puppeteer'
import { Browser } from 'puppeteer'

class PdfRenderer {
  private browser: Browser

  public async start(): Promise<void> {
    this.browser = await puppeteer.launch()
  }

  public async generate(content: string): Promise<Buffer> {
    if (!this.browser || !this.browser.isConnected()) {
      await this.start()
    }

    const page = await this.browser.newPage()
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
