import "@babel/polyfill"
import PdfGenerator from '../src/PdfGenerator'
import path from 'path'
import express from 'express'

// PDF
const baseDir = path.join(__dirname, '/../demo-api/templates')
const pdf = new PdfGenerator(path.join(baseDir))

pdf.addTemplate('test-1', 'template-1/template.pug', {
  properties: {
    title: {
      type: 'string'
    }
  },
  required: ['title']
})

pdf.addTemplate('test-2', 'template-2/template.pug', {
  properties: {
    title: {
      type: 'string'
    }
  },
  required: ['title']
})

// HTTP server
const app = express()
app.use(express.json())

app.post('/pdf-generate/:key', async (req, res) => {
  try {
    const data = await pdf.renderPdf(req.params.key, req.body)

    res.set('Content-Type', 'application/pdf')
    res.send(data)
  } catch (e) {
    console.error(e)
    res.status(400)
    res.send({ error: e.message, validErrors: e.errors })
  }
})


const runApp = async () => {
  await pdf.start()
  app.listen(3001, () => {
    console.log('HTTP server running on 3001')
  })
}

runApp()