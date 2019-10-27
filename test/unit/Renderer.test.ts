import Renderer from '@src/Renderer'
import Template from '@src/Template'

test('Renderer::addTemplate', async () => {
  const renderer = new Renderer()
  renderer.addTemplate(new Template('test', 'path'))

  expect(renderer.getKeys()).toEqual(['test'])
})

test('Renderer::render', async () => {
  const renderer = new Renderer()
  renderer.addTemplate(new Template('test', `${__dirname}/../data/template.pug`))

  const res = '<!DOCTYPE html><html><head><title>TITLE</title></head><body><div><h1></h1></div></body></html>'

  expect(renderer.render('test')).toEqual(res)
})

test('Renderer::render - with validation error', async () => {
  const renderer = new Renderer()
  renderer.addTemplate(
    new Template('test', `${__dirname}/../data/template.pug`, {
      properties: {
        title: {
          type: 'string'
        }
      },
      required: ['title']
    })
  )

  expect(() => renderer.render('test')).toThrow()
  expect(renderer.getValidationErrors()).toEqual([
    {
      dataPath: '',
      keyword: 'required',
      message: "should have required property 'title'",
      params: {
        missingProperty: 'title'
      },
      schemaPath: '#/required'
    }
  ])
})

test('Renderer::render - with validation', async () => {
  const renderer = new Renderer()
  renderer.addTemplate(
    new Template('test', `${__dirname}/../data/template.pug`, {
      properties: {
        title: {
          type: 'string'
        }
      },
      required: ['title']
    })
  )

  const res = '<!DOCTYPE html><html><head><title>TITLE</title></head><body><div><h1>title</h1></div></body></html>'

  expect(renderer.render('test', { title: 'title' })).toEqual(res)
})
