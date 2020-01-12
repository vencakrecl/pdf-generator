import "@babel/polyfill"
import PdfGenerator from '../src/PdfGenerator'
import path from 'path'
// import fs from 'fs'

const createPdf = async () => {
  const baseDir = path.join(__dirname, '/../demo/template')

  const pdf = new PdfGenerator(path.join(baseDir))
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

  // fs.writeFile(`${baseDir}/test.pdf`, data, () => {
  //   console.log('test.pdf created')
  // })

  console.log(data)

  await pdf.stop()
}

createPdf()