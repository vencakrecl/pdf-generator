import Template from '../../../src/html-renderer/Template'

test('Template:validate', async () => {
  const template = new Template('test', 'path')

  expect(template.validate({})).toEqual([])
})

test('Template:validate - error', async () => {
  const template = new Template('test', 'path', {
    type: 'object',
    properties: {
      title: {
        type: 'string',
      },
    },
    required: ['title'],
  })

  expect(template.validate({})).toEqual([
    {
      instancePath: '',
      keyword: 'required',
      message: "must have required property 'title'",
      params: {
        missingProperty: 'title',
      },
      schemaPath: '#/required',
    },
  ])
})
