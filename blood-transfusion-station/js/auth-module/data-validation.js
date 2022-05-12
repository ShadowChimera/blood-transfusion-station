'use strict'

const INPUT_REG_EXPS = {
    email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
    phone: /^\+\d{12}$/,
    password: /^[0-9a-zA-Z!@#$%^&*_]+$/,
}
const ERROR_MESSAGES = {
    email: 'Неверный формат почты',
    phone: 'Неверный формат телефона',
    password: 'Неверный формат пароля',
}
const EXTENDED_ERROR_MESSAGES = {
    email: 'Неверный формат почты',
    phone: 'Телефон может состоять только из 12-ти цифр',
    password:
        'Пароль может состоять только из цифр, латинских и специальных символов',
}

export function validateAuthInputs(auth_inputs) {
    let isValid = true

    for (let inputName in auth_inputs) {
        const inputValue = auth_inputs[inputName].value
        const isCurInputValid =
            inputValue.match(INPUT_REG_EXPS[inputName]) !== null

        if (isCurInputValid) {
            continue
        }

        showValidationError(auth_inputs, ERROR_MESSAGES[inputName])
        isValid = false
    }

    return isValid
}

function showValidationError(input, message) {
    const inputContainer = input.closets('.input-container')

    if (inputContainer === null) {
        input.classList.add('error')
        return
    }

    inputContainer.classList.add('error')

    const inputInfo = inputContainer.querySelector('.input-info')

    if (inputInfo !== null) {
        inputInfo.textContent = message
    }
}
