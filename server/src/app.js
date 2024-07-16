let express = require('express')
let bodyParser = require('body-parser')

var user_details = require('../json/user_details.json')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/status', function (req, res ) {
    res.send('Hello nodejs server')
})

app.get('/powmath', function (req, res) {
    const base = 3;
    const exponent = 2;
    const result = Math.pow(base, exponent);
    res.send(`Result of ${base}^${exponent} is: ${result}`);
});

app.get('/users', function (req, res) {
    res.send(user_details)
})

app.get('/users/:user_id', function (req, res) {
    res.send(`ID : ${req.params.user_id}`)
})

// create user
app.post('/user/', function (req, res) {
    res.send(`Create Account : ${JSON.stringify(req.body/*.username*/)}`)
})

let port = 8081

app.listen(port, function () {
    console.log('server running on http://localhost:' + port)
})