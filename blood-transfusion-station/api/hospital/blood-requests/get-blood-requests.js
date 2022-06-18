'use strict'

const ServerMessages = require(`${global.__basedir}/modules/communication/server-messages.js`)

const requests = [
    {
        date: '17.06.2022',
        bloodGroup: 'A(II) Rh+ Kell+',
        component: 'Еритроцити',
        count: '5',
        status: 'Очікує розгляду',
    },
    {
        date: '17.06.2022',
        bloodGroup: 'A(II) Rh- Kell+',
        component: 'Плазма',
        count: '5',
        status: 'Схвалено',
    },
]

function getRequests(req, res) {
    const response = ServerMessages.getTemplate(
        'api/hospital/blood-requests/get-blood-requests'
    )

    response.result = requests

    res.status(200).json(response)
}

module.exports = getRequests
