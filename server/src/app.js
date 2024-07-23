let express = require('express')
let bodyParser = require('body-parser')
const { sequelize } = require('./models')

const config = require('./config/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes')(app);

// Localhost Port
let port = process.env.PORT || config.port

sequelize.sync({ force: false }).then(() => {
    app.listen(port, function () {
        console.log('Server running on http://localhost:' + port)
    })
})