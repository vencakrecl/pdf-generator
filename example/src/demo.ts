import fs from 'fs'
import path from 'path'
import { PdfGenerator } from '@vencakrecl/pdf-generator'

const createPdf = async (): Promise<void> => {
  const baseDir = path.join(__dirname, '../data/demo')

  const pdf = new PdfGenerator(path.join(baseDir))
  await pdf.start()

  pdf.addTemplate('test', 'template.pug', {
    type: 'object',
    properties: {
      title: {
        type: 'string',
      },
    },
    required: ['title'],
  })

  const data = await pdf.generate('test', { title: 'Title' })

  fs.writeFile(`${baseDir}/test.pdf`, data, () => {
    console.log('test.pdf was created.')
  })

  await pdf.stop()
}

export default createPdf
