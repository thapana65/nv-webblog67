let express = require('express')
let bodyParser = require('body-parser')

var user_details = require('../path/user_details.json')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/status', function (req, res ) {
    res.send('Hello nodejs server')
})

app.get('/users', function (req, res) {
    res.send(user_details)
})

app.get('/users/:user_id', function (req, res) {
    res.send('say hello with ' + req.params.user_id)
})

app.get('/powmath')

let port = 8081

app.listen(port, function () {
    console.log('server running on http://localhost:' + port)
})