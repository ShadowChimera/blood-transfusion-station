'use strict'

class DataValidation {
    static VALIDATION_REG_EXPS = {
        email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
        phone: /^\+\d{12}$/,
        password: /^[0-9a-zA-Z!@#$%^&*_]+$/,
    }

    static isEmailValid(email, isEmptyAllowed = true) {
        if (isEmptyAllowed && !email) {
            return true
        }

        return email.match(this.VALIDATION_REG_EXPS.email) !== null
    }

    static isPhoneValid(phone, isEmptyAllowed = true) {
        if (isEmptyAllowed && !phone) {
            return true
        }

        return phone.match(this.VALIDATION_REG_EXPS.phone) !== null
    }

    static isLoginValid(login) {
        return (
            this.isEmailValid(login, false) || this.isPhoneValid(login, false)
        )
    }

    static isPasswordValid(password) {
        return password.match(this.VALIDATION_REG_EXPS.password) !== null
    }
}

module.exports = DataValidation
