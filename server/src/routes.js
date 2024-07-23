const UserController = require('./controllers/userController');

module.exports = (app) => {
    // create user
    app.post('/user', UserController.create)

    // edit user by id
    app.put('/users/:userId', UserController.put)

    // delete user
    app.delete('/users/:userId', UserController.remove)

    // get user by id
    app.get('/users/:userId', UserController.show)

    // get all user
    app.get('/users', UserController.index)
}