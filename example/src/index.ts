import createPdf from './demo'
import runApp from './demo-api'

const args = process.argv.slice(2)

switch (args[0]) {
  case 'demo': {
    createPdf()

    break
  }
  case 'demo-api': {
    runApp()

    break
  }
  default: {
    throw new Error('Unsupported arg. Use demo or demo-api.')
  }
}
