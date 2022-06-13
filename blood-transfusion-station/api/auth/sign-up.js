'use strict'

const ServerMessages = require(`${global.__basedir}/modules/communication/server-messages.js`)

const DataValidation = require('./data-validation.js')

function signUp(req, res) {
    console.log(req.body)

    const response = ServerMessages.getTemplate('api/auth/sign-up')

    if (!isDataValid(req.body, response)) {
        response.status = 'error'
        res.status(200).json(response)
        return
    }

    res.location('/sign-in')
}

module.exports = signUp

// Функции ===================================================================

function isDataValid(data, response = undefined) {
    let isDataValid = true

    if (!DataValidation.isEmailValid(data.email)) {
        response?.messages.push('Неверный формат почты')
        isDataValid = false
    }

    if (!DataValidation.isPhoneValid(data.phone)) {
        response?.messages.push('Неверный формат телефона')
        isDataValid = false
    }

    if (!data.email && !data.phone) {
        response?.messages.push(
            'Для регистрации обязательно требуется или почта, или номер телефона'
        )
        isDataValid = false
    }

    if (!DataValidation.isPasswordValid(data.password)) {
        response?.messages.push('Неверный формат пароля')
        isDataValid = false
    }

    if (data['repeat-password'] && data['repeat-password'] !== data.password) {
        response?.messages.push('Пароли не совпадают')
        isDataValid = false
    }

    return isDataValid
}
