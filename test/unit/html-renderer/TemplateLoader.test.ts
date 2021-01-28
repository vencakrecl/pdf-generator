import TemplateLoader from '../../../src/html-renderer/TemplateLoader'

test('TemplateLoader:load', () => {
  const templateLoader = new TemplateLoader(`${__dirname}/templates`)

  const templates = templateLoader.load()

  expect(templates.length).toBe(2)
  expect(templates[0].getId()).toBe('template-1')
  expect(templates[0].getPath()).toBe(`${__dirname}/templates/template-1/template.pug`)
  expect(templates[0].getSchema()).toStrictEqual({
    type: "object",
    properties: {
      title: {
        type: 'string',
      },
    },
    required: ['title'],
  })
  expect(templates[0].validate({})).toStrictEqual([
    {
      dataPath: '',
      keyword: 'required',
      message: "should have required property 'title'",
      params: { missingProperty: 'title' },
      schemaPath: '#/required',
    },
  ])
  // template 2
  expect(templates[1].getId()).toBe('template-2')
  expect(templates[1].getPath()).toBe(`${__dirname}/templates/template-2/template.pug`)
  expect(templates[1].getSchema()).toStrictEqual({
    type: "object",
    properties: {
      title: {
        type: 'string',
      },
    },
    required: ['title'],
  })
  expect(templates[1].validate({ title: 'Title' })).toStrictEqual([])
})
