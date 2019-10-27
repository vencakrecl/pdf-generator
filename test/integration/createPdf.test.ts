import { Generator, Renderer, Template } from '../../src/index'
import fs from 'fs'

test('Create PDF', async () => {
  const generator = new Generator()
  const renderer = new Renderer()

  const template = new Template('test', 'test/integration/template.pug', {
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
