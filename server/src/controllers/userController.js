// module.exports = {
//     // get all user
//     index (req, res) {
//         res.send('เรียกข้อมูลผู้ใช้งานทั้งหมด')
//     },

//     // create user
//     create (req, res) {
//         res.send('ทำการสร้างผู้ใช้งาน : ' + JSON.stringify(req.body))
//     },

//     // edit user, suspend, active
//     put (req, res) {
//         res.send('ทำการแก้ไขผู้ใช้งาน ' + req.params.userId + ' : ' + JSON.stringify(req.body))
//     },

//     // delete user
//     delete (req, res) {
//         res.send('ทำการลบผู้ใช้งาน ' + req.params.userId + ' : ' + JSON.stringify(req.body))
//     },

//     // get user by id
//     show (req, res) {
//         res.send('ดูข้อมูลผู้ใช้งาน : ' + req.params.userId)
//     }
// }

const { User } = require('../models')

module.exports = {
    // get all user
    async index (req, res) {
        try {
            const users = await User.findAll()
            res.send(users)
        } catch (err) {
            res.status(500).send({
                error: 'The users information was incorrect.'
            })
        }
    }, // index

    // create user
    async create (req, res) {
        try {
            const users = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create user inncorrect'
            })
        }
    }, // create

    // edit user, supend, active
    async put (req, res) {
        try {
            await User.update(req.body, {
                where: {
                    id: req.params.userId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update user inncorrect'
            })
        }
    }, // update(put)

    // delete user
    async remove (req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.userId
                }
            })

            if(!user) {
                return res.status(403).send({
                    error: 'The user information was incorrect.'
                })
            }
            
            await user.destory()
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: 'The user information was incorrect.'
            })
        }
    }, // delete

    // get user by id
    async show (req, res) {
        try {
            const user = await User.findByPk(req.params.userId)
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: 'The user information was incorrect.'
            })
        }
    },
}