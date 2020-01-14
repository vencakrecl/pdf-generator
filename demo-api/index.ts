import '@babel/polyfill'
import PdfGenerator from '../src/PdfGenerator'
import path from 'path'
import express from 'express'

// PDF
const pdf = new PdfGenerator(path.join(path.join(__dirname, '/../demo-api/templates')))
pdf.setLogger(console)
pdf.loadTemplates()

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

app.get('/templates', async (req, res) => {
  const data = await pdf.getTemplateKeys()

  res.set('Content-Type', 'application/json')
  res.send(JSON.stringify(data))
})

const runApp = async (): Promise<void> => {
  await pdf.start()
  app.listen(3001, () => {
    console.log('HTTP server running on 3001')
  })
}

runApp()
