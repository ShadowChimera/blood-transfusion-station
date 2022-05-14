'use strict'

// const ERROR_MESSAGES = {
//     email: 'Неверный формат почты',
//     phone: 'Неверный формат телефона',
//     password: 'Неверный формат пароля',
//     'password-repeat': 'Пароли не совпадают',
// }
// const EXTENDED_ERROR_MESSAGES = {
//     email: 'Неверный формат почты',
//     phone: 'Телефон должен начинаться со знака "+" и содержать 12 цифр',
//     password:
//         'Пароль может состоять только из цифр, латинских и специальных символов',
//     'password-repeat': 'Пароли не совпадают',
// }

const VALIDATION_REG_EXPS = {
    email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
    phone: /^\+\d{12}$/,
    password: /^[0-9a-zA-Z!@#$%^&*_]+$/,
}
const INPUT_STATES = {
    error: 'error',
    warning: 'warning',
}

function isEmailValid(email, isEmptyAllowed = true) {
    // email = email ?? null
    if (isEmptyAllowed && !email) {
        return true
    }

    return email.match(VALIDATION_REG_EXPS.email) !== null
}

function isPhoneValid(phone, isEmptyAllowed = true) {
    // phone = phone ?? null
    if (isEmptyAllowed && !phone) {
        return true
    }

    return phone.match(VALIDATION_REG_EXPS.phone) !== null
}

function isLoginValid(login) {
    return isEmailValid(login, false) || isPhoneValid(login, false)
}

function isPasswordValid(password) {
    return password.match(VALIDATION_REG_EXPS.password) !== null
}

// * ```````

export { isEmailValid, isPhoneValid, isLoginValid, isPasswordValid }
