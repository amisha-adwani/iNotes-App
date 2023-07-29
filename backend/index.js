const main = require('./db');
const express = require('express')

main(); 
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Mongoji!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
