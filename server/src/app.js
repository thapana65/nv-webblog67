let express = require('express')
let bodyParser = require('body-parser')
const { sequelize } = require('./models')

const config = require('./config/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes')(app);

/* *** ----------------------------------------- *** */
app.get('/status', function (req, res) {
    res.send('Hello nodejs server')
})

app.get('/welcome/:person', function(req, res) {
    res.send('Say hello with - ' + req.params.person)
})

app.post('welcome', function(req, res) {
    res.send('OK you post - ' + req.body.name)
})
/* *** ----------------------------------------- *** */

// Localhost Port
let port = process.env.PORT || config.port

sequelize.sync({ force: false }).then(() => {
    app.listen(port, function () {
        console.log('Server running on http://localhost:' + port)
    })
})