let express = require('express')

let bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes')(app);

// Localhost Port
let port = 8081

app.listen(port, function () {
    console.log('server running on http://localhost:' + port)
})