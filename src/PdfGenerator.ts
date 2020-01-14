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
  public generator: PdfRenderer
  public renderer: HtmlRenderer
  private logger: Logger
  private templateLoader: TemplateLoader

  constructor(templatesPath = __dirname, httpPort = 3000) {
    this.templatesPath = templatesPath
    this.httpPort = httpPort
    this.renderer = new HtmlRenderer()
    this.generator = new PdfRenderer()
    this.logger = new NullLogger()
    this.templateLoader = new TemplateLoader(this.templatesPath)
  }

  public setLogger(logger: Logger): void {
    this.logger = logger
  }

  public async start(): Promise<void> {
    const app = express()
    app.use('/static', express.static(this.templatesPath))

    this.server = app.listen(this.httpPort, () => {
      this.logger.info(`Starting HTTP server on ${this.httpPort}`)
    })

    await this.generator.start()
  }

  public async stop(): Promise<void> {
    await this.generator.stop()

    if (this.server) {
      this.server.close(() => {
        this.logger.info('Closing HTTP server')
      })
    }
  }

  public loadTemplates(): void {
    const templates = this.templateLoader.load()

    templates.forEach(item => {
      this.renderer.addTemplate(item)
    })
  }

  public addTemplate(key: string, filename = 'template', schema: object = {}): void {
    this.renderer.addTemplate(new Template(key, path.join(this.templatesPath, filename), schema))
  }

  public getTemplateKeys(): Array<string> {
    return this.renderer.getKeys()
  }

  public renderPdf(key: string, data: object): Promise<Buffer> {
    return this.generator.generate(
      this.renderer.render(key, { baseUrl: `http://localhost:${this.httpPort}/static`, ...data })
    )
  }
}

export default PdfGenerator
