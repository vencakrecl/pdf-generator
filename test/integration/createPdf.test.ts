import { Generator, Renderer, Template } from '../../src/index'
import fs from 'fs'
import PdfRenderer from '@src/PdfRenderer'

test('Create PDF', async () => {
  const generator = new Generator()
  const renderer = new Renderer()

  const template = new Template('test', `${__dirname}/../data/template.pug`, {
    properties: {
      title: {
        type: 'string'
      }
    },
    required: ['title']
  })

  renderer.addTemplate(template)

  await generator.start()

  const pdf = await generator.generate(renderer.render('test', { title: 'My title' }))

  await generator.stop()

  expect(pdf).toBeDefined()
})

test('Create PDF - with assets 2', async () => {
  const pdf = new PdfRenderer(4000, `${__dirname}/../data`)
  await pdf.start()

  pdf.addTemplate('test', 'test-assets/template-assets.pug', {
    properties: {
      title: {
        type: 'string'
      }
    },
    required: ['title']
  })

  const data = await pdf.renderPdf('test', { title: 'Title' })

  // fs.writeFile(`${__dirname}/../data/test-assets/test.pdf`, data, () => {
  //   console.log('test.pdf created')
  // })

  expect(data).toBeDefined()

  await pdf.stop()
})
