# PDF Generator

Package for convert HTML to PDF by headless chrome (https://github.com/puppeteer/puppeteer).

* JSON schema validation (https://github.com/epoberezkin/ajv)
* Template engine (https://github.com/pugjs/pug)
* CSS (https://github.com/twbs/bootstrap)
* HTTP server for static files (https://github.com/expressjs/expressjs.com)

### Example
```
const pdf = new PdfRenderer(`base_dir`)
await pdf.start()

pdf.addTemplate('test', 'template.pug', {
  properties: {
    title: {
      type: 'string'
    }
  },
  required: ['title']
})

const data = await pdf.renderPdf('test', {title: 'Title'})

console.log(data)

await pdf.stop()
```
