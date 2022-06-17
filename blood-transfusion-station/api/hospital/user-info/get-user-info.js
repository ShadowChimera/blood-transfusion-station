'use strict'

const ServerMessages = require(`${global.__basedir}/modules/communication/server-messages.js`)

const userInfo = {
    username: 'Міська лікарня №1',
    email: 'alexey22042001@gmail.com',
    phone: '+380685494521',
    address: 'Кривий Ріг, вул. Рязанова буд.8',
}

function getUserInfo(req, res) {
    const response = ServerMessages.getTemplate(
        'api/hospital/user-info/get-user-info'
    )

    response.result = userInfo

    res.status(200).json(response)
}

module.exports = getUserInfo
