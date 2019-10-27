import Generator from "@src/Generator";

test('Generator::generate', async () => {

  const generator = new Generator()
  const pdf = await generator.generate('abc')

  expect(pdf).toBeDefined()

  await generator.stop()
})
