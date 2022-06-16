'use strict'

const ServerMessages = require(`${global.__basedir}/modules/communication/server-messages.js`)

const userInfo = {
    username: 'Бабенко Олексій',
    email: 'alexey22042001@gmail.com',
    phone: '+380685494521',
    bloodGroup: {
        group: 'A (II)',
        rh: 'Rh+',
        kell: 'Kell+',
    },
    avatarSrc: '',
}

function getUserInfo(req, res) {
    const response = ServerMessages.getTemplate(
        'api/donor/user-info/get-user-info'
    )

    response.result = userInfo

    res.status(200).json(response)
}

module.exports = getUserInfo
