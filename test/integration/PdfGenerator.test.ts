import PdfGenerator from '../../src/PdfGenerator'

const pdf = new PdfGenerator(`${__dirname}/../data`)

describe('PDF HtmlRenderer', () => {
  beforeAll(async () => {
    await pdf.start()
  })

  test('Create PDF', async () => {
    pdf.addTemplate('test', `template.pug`, {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
      },
      required: ['title'],
    })

    const data = await pdf.generate('test', { title: 'Title' })

    expect(data).toBeDefined()
  })

  test(
    'Create PDF - with assets',
    async () => {
      pdf.addTemplate('test-assets', 'test-assets/template-assets.pug', {
        type: 'object',
        properties: {
          title: {
            type: 'string',
          },
        },
        required: ['title'],
      })

      const data = await pdf.generate('test-assets', { title: 'Title' })

      // fs.writeFile(`${__dirname}/../data/test-assets/test.pdf`, data, () => {
      //   console.log('test.pdf created')
      // })

      expect(data).toBeDefined()
    },
    15 * 1000
  )

  afterAll(async () => {
    await pdf.stop()
  })
})
