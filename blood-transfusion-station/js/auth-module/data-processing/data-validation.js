'use strict'

const VALIDATION_REG_EXPS = {
    email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
    phone: /^\+\d{12}$/,
    password: /^[0-9a-zA-Z!@#$%^&*_]+$/,
}

function isEmailValid(email, isEmptyAllowed = true) {
    if (isEmptyAllowed && !email) {
        return true
    }

    return email.match(VALIDATION_REG_EXPS.email) !== null
}

function isPhoneValid(phone, isEmptyAllowed = true) {
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
