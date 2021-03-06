const express = require('express')
const babel = require('babel-core')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.options('/transform', cors())
app.post('/transform', cors(), (req, res) => {
  res.type('text')
  try {
    const {code} = req.body
    const result = babel.transform(code, {
      presets: ['vue']
    })
    res.send({
      code: result.code
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

app.get('/', (req, res) => {
  res.end(`
  POST /transform

  Data:
  - code: the source code you wanna transform

  Repo: https://github.com/egoist/vue-jsx-api
`)
})

app.listen(3000)
console.log(`Open http://localhost:3000`)
