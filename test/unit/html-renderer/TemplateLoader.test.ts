import TemplateLoader from '../../../src/html-renderer/TemplateLoader'

test('TemplateLoader:load', () => {
  const templateLoader = new TemplateLoader(`${__dirname}/templates`)

  const templates = templateLoader.load()

  expect(templates.length).toBe(2)
  expect(templates[0].getId()).toBe('template-1')
  expect(templates[0].getPath()).toBe(`${__dirname}/templates/template-1/template.pug`)
  expect(templates[1].getId()).toBe('template-2')
  expect(templates[1].getPath()).toBe(`${__dirname}/templates/template-2/template.pug`)
})
