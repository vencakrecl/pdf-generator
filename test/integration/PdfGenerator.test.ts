import PdfGenerator from '@src/PdfGenerator'

const pdf = new PdfGenerator(`${__dirname}/../data`)

describe('PDF HtmlRenderer', () => {
  beforeAll(async () => {
    await pdf.start()
  })

  test('Create PDF', async () => {
    pdf.addTemplate('test', `template.pug`, {
      properties: {
        title: {
          type: 'string'
        }
      },
      required: ['title']
    })

    const data = await pdf.renderPdf('test', { title: 'Title' })

    expect(data).toBeDefined()
  })

  test('Create PDF - with assets', async () => {
    pdf.addTemplate('test-assets', 'test-assets/template-assets.pug', {
      properties: {
        title: {
          type: 'string'
        }
      },
      required: ['title']
    })

    const data = await pdf.renderPdf('test-assets', { title: 'Title' })

    // fs.writeFile(`${__dirname}/../data/test-assets/test.pdf`, data, () => {
    //   console.log('test.pdf created')
    // })

    expect(data).toBeDefined()
  })

  afterAll(async done => {
    await pdf.stop()
  })
})
