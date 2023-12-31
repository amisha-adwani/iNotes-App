const main = require('./db');
const express = require('express')
const router = require('./routes/auth')
var cors = require('cors')
main(); 
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

//routes
app.use('/api/auth', router)
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Mongoji!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
