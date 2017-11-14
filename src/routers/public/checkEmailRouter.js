'use strict';

const
    Router = require('koa-router'),
    User = require('../../models/userModel').User,
    UserService = require('../../services/userService'),
    sg = require('../../services/emailService')

let checkEmailRouter = new Router()

checkEmailRouter.get('/checkEmail', function* (next) {
    let username = this.request.query.username,
        user
    if (username)
        user = yield User.findOne({
            username: username.toLowerCase()
        })
    if (user) {
        this.status = 200
        return;
    }
    this.status = 404
})

checkEmailRouter.get('/:hash', function* (next) {
    let user

        user = yield User.findOne({
            'hash': this.params.hash
        })

    if (user) {
        this.status = 200
        return;
    }

    this.status = 404
})

checkEmailRouter.patch('/:hash', function* (next) {
    try {
        let params = this.request.body

        let newUser = yield UserService.activateUser(params)

        if (!newUser)
            this.throw(400, 'Error in User update!')

        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

checkEmailRouter.patch('/password/recovery', function* (next) {
    try {
        let params = this.request.body.email

        let newUserPassword = yield UserService.generateToken(params)

        if (!newUserPassword)
            this.throw(404, 'E-mail não encontrado!')

        sg.sendRecovery(newUserPassword)

        this.status = 200
        // if (!newUser)
        //     this.throw(400, 'Error in User update!')

        // this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});

checkEmailRouter.patch('/password', function* (next) {
    try {
         let params = this.request.body

        let user = yield UserService.changePassword(params)

        this.status = 200
        
    } catch (err) {

        this.body = err.message
        this.status = 400
    }
});


module.exports = checkEmailRouter