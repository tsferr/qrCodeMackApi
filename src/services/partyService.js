'use strict'

const
    PartyRepository = require('../repositories/partyRepository'),
    moment = require('moment')

class PartyService {

    * getParties(user) {
        return yield PartyRepository.find({
            user: user._id
        })
    }

    * getParty(id) {
        return yield PartyRepository.findOne({
            _id: id
        })
    }

    * create(body) {
        return yield PartyRepository.create(body)
    }

    * update(id, body) {
        return yield PartyRepository.update({
            _id: id
        }, body)
    }

    * delete(id) {
        return yield PartyRepository.update({
            _id: id
        }, {
            $set: {
                isActive: false
            }
        })
    }

}

module.exports = new PartyService()