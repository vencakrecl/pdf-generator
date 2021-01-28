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
      dataPath: '',
      keyword: 'required',
      message: "should have required property 'title'",
      params: {
        missingProperty: 'title',
      },
      schemaPath: '#/required',
    },
  ])
})
