# PDF Generator

[![NPM version][npm]](https://www.npmjs.com/package/@vencakrecl/pdf-generator)

Package for convert HTML to PDF by headless Chrome ([puppeteer](https://github.com/puppeteer/puppeteer)).

* JSON schema validation ([ajv](https://github.com/epoberezkin/ajv))
* Template engine ([pug](https://github.com/pugjs/pug))
* CSS ([bootstrap](https://github.com/twbs/bootstrap))
* HTTP server for static files ([expressjs](https://github.com/expressjs/expressjs.com))

### Installation
```bash
npm install @vencakrecl/pdf-generator
```

### Demo
```bash
make run-demo
make run-demo-api ## HTTP server running on localhost:3001
```

### Example
```typescript
import { PdfGenerator } from '@vencakrecl/pdf-generator'

const createPdf = async () => {
  const pdf = new PdfGenerator('base_dir')
  await pdf.start()

  pdf.addTemplate('test', 'template.pug', {
    properties: {
      title: {
        type: 'string'
      }
    },
    required: ['title']
  })

  const data = await pdf.generate('test', {title: 'Title'})

  console.log(data)

  await pdf.stop()
}

createPdf()
```

[npm]: https://img.shields.io/npm/v/@vencakrecl/pdf-generator.svg?style=flat-square
