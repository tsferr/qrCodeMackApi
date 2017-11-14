'use strict'

const
    mongoose = require('mongoose'),
    Router = require('koa-router'),
    PartyService = require('../../services/partyService')

let partyRouter = new Router()

partyRouter.get('/me', function* (next){
    try {

        let parties = yield PartyService.getParties(this.user)

        this.body = parties
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

partyRouter.get('/:id', function* (next){
    try {

        let party = yield PartyService.getParty(this.params.id)

        this.body = party
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

partyRouter.post('/', function* (next){
    try {

        let party = yield PartyService.create(this.request.body)
        
        this.body = party
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

partyRouter.put('/:id', function* (next){
    try {

        let party = yield PartyService.update(this.params.id, this.request.body)
        
        this.body = party
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

partyRouter.del('/:id', function* (next){
    try {

        let party = yield PartyService.delete(this.params.id)
        
        this.body = party
        this.status = 200

    } catch (err) {

        this.body = err.message
        this.status = 400
    }
})

module.exports = partyRouter