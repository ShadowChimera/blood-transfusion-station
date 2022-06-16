'use strict'

const ServerMessages = require(`${global.__basedir}/modules/communication/server-messages.js`)

function addRestrictions(req, res) {
    const response = ServerMessages.getTemplate(
        'api/donor/restrictions/add-restrictions'
    )

    console.log(req.body)

    res.status(200).json(response)
}

module.exports = addRestrictions
