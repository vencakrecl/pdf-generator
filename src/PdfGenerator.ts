import express from 'express'
import * as http from 'http'
import PdfRenderer from './pdf-renderer/PdfRenderer'
import HtmlRenderer from './html-renderer/HtmlRenderer'
import Template from './html-renderer/Template'
import path from 'path'
import Logger from './logger/Logger'
import NullLogger from './logger/NullLogger'
import TemplateLoader from './html-renderer/TemplateLoader'

class PdfGenerator {
  private server: http.Server
  private readonly httpPort: number
  private readonly templatesPath: string
  private pdfRenderer: PdfRenderer
  private htmlRenderer: HtmlRenderer
  private logger: Logger
  private templateLoader: TemplateLoader

  constructor(templatesPath = __dirname, httpPort = 3000) {
    this.templatesPath = templatesPath
    this.httpPort = httpPort
    this.htmlRenderer = new HtmlRenderer()
    this.pdfRenderer = new PdfRenderer()
    this.logger = new NullLogger()
    this.templateLoader = new TemplateLoader(this.templatesPath)
  }

  public setLogger(logger: Logger): void {
    this.logger = logger
    this.templateLoader.setLogger(logger)
    this.pdfRenderer.setLogger(logger)
  }

  public async start(): Promise<void> {
    const app = express()
    app.use('/static', express.static(this.templatesPath))

    this.server = app.listen(this.httpPort, () => {
      this.logger.info(`Starting HTTP server for static files on ${this.httpPort}`)
    })

    await this.pdfRenderer.start()
  }

  public async stop(): Promise<void> {
    await this.pdfRenderer.stop()

    if (this.server) {
      this.server.close(() => {
        this.logger.info('Closing HTTP server for static files')
      })
    }
  }

  public loadTemplates(): void {
    const templates = this.templateLoader.load()

    templates.forEach((item) => {
      this.htmlRenderer.addTemplate(item)
    })
  }

  public addTemplate(key: string, filename = 'template', schema: object = {}): void {
    this.htmlRenderer.addTemplate(new Template(key, path.join(this.templatesPath, filename), schema))
  }

  public getTemplateIds(): Array<string> {
    return this.htmlRenderer.getIds()
  }

  public generate(key: string, data: object): Promise<Buffer> {
    return this.pdfRenderer.render(
      this.htmlRenderer.render(key, { baseUrl: `http://localhost:${this.httpPort}/static`, ...data })
    )
  }
}

export default PdfGenerator
