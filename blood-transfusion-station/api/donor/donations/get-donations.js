'use strict'

const ServerMessages = require(`${global.__basedir}/modules/communication/server-messages.js`)

const donations = [
    {
        date: '20.01.2021',
        donationType: 'Цільна кров',
        testId: '1',
        testResult: 'Норма',
        details: '-',
    },
    {
        date: '16.05.2022',
        donationType: '-',
        testId: '2',
        testResult: 'Виявлено гепатит А в крові',
        details: 'Сдача крові була заборонена через наявність вірусу у донора',
    },
]

function getDonations(req, res) {
    const response = ServerMessages.getTemplate(
        'api/donor/donations/get-restrictions'
    )

    response.result = donations

    res.status(200).json(response)
}

module.exports = getDonations
