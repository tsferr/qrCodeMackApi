'use strict'

const Party = require('../models/partyModel').Party

class PartyRepository {

    * findOne(query) {
        return yield Party.findOne(query)
    }

    * find(query) {
        return yield Party.find(query)
    }

    * create(query) {
        return yield Party.create(query)
    }

    * update(id, data) {
        return yield Party.update(id, data)
    }

}

module.exports = new PartyRepository()