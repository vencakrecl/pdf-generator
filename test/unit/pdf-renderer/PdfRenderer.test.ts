import PdfRenderer from '../../../src/pdf-renderer/PdfRenderer'

test('Generator::render', async () => {
  const generator = new PdfRenderer()
  const pdf = await generator.render('abc')

  expect(pdf).toBeDefined()

  await generator.stop()
})
