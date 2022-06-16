'use strict'

const ServerMessages = require(`${global.__basedir}/modules/communication/server-messages.js`)

const restrictions = [
    {
        name: 'Гепатит А',
        remainingTime: '7 місяців',
        startTime: '15.01.2022',
        endTime: '15.01.2023',
    },
    {
        name: 'Лазерна операція на очах',
        remainingTime: '3 дні',
        startTime: '17.05.2022',
        endTime: '18.06.2022',
    },
]

function getRestrictions(req, res) {
    const response = ServerMessages.getTemplate(
        'api/donor/restrictions/get-restrictions'
    )

    response.result = restrictions

    res.status(200).json(response)
}

module.exports = getRestrictions
