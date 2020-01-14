import PdfRenderer from '../../../src/pdf-renderer/PdfRenderer'

test('Generator::generate', async () => {
  const generator = new PdfRenderer()
  const pdf = await generator.generate('abc')

  expect(pdf).toBeDefined()

  await generator.stop()
})
