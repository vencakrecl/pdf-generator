import path from 'path'
import { PdfGenerator } from '@vencakrecl/pdf-generator'
import fs from 'fs'

const createPdf = async (): Promise<void> => {
  const baseDir = path.join(__dirname, '../data/demo')

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

  const data = await pdf.renderPdf('test', { title: 'Title' })

  fs.writeFile(`${baseDir}/test.pdf`, data, () => {
    console.log('test.pdf created')
  })

  await pdf.stop()
}

export default createPdf
