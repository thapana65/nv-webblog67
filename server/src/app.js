let express = require('express')
const app = express()

app.get('/status', function (req, res ) {
    res.send('Hello nodejs server')
})

app.get('hello/:person', function (req, res) {
    console.log('hello - ' + req.params.person)
    res.send('say hello with ' + req.params.person)
})

// get user by id
app.get('user/:userId', function (req, res) {
    res.send('ดูข้อมูลผู้ใช้')
})

// get all user
app.get('/users', function (req, res) {
    res.send('เรียกข้อมูลทั้งหมด')
})

let port = 8081

app.listen(port, function () {
    console.log('server running on ' + port)
})