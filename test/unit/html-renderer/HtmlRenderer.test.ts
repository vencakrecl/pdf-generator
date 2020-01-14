import HtmlRenderer from '../../../src/html-renderer/HtmlRenderer'
import Template from '../../../src/html-renderer/Template'

test('HtmlRenderer::addTemplate', async () => {
  const renderer = new HtmlRenderer()
  renderer.addTemplate(new Template('test', 'path'))

  expect(renderer.getKeys()).toEqual(['test'])
})

test('HtmlRenderer::render', async () => {
  const renderer = new HtmlRenderer()
  renderer.addTemplate(new Template('test', `${__dirname}/../../data/template.pug`))

  const res = '<!DOCTYPE html><html><head><title>TITLE</title></head><body><div><h1></h1></div></body></html>'

  expect(renderer.render('test')).toEqual(res)
})

test('HtmlRenderer::render - with validation error', async () => {
  const renderer = new HtmlRenderer()
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
  try {
    renderer.render('test')
  } catch (e) {
    expect(e.errors).toEqual([
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
  }
})

test('HtmlRenderer::render - with validation', async () => {
  const renderer = new HtmlRenderer()
  renderer.addTemplate(
    new Template('test', `${__dirname}/../../data/template.pug`, {
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
