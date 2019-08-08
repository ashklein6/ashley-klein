let express = require('express')
let app = express()
const port = 3000

app.use(express.static('src'))

app.get('/', function (req,res) {
  res.sendFile(express.static)
})

app.listen(port, err => {
  if (!err) {
    console.log(`app listening on port ${port}`)
  } else {
    console.log(err)
  }
})