'use strict'

const ERROR_MESSAGES = {
    email: 'Неверный формат почты',
    phone: 'Неверный формат телефона',
    password: 'Неверный формат пароля',
    'password-repeat': 'Пароли не совпадают',
}
const EXTENDED_ERROR_MESSAGES = {
    email: 'Неверный формат почты',
    phone: 'Телефон должен начинаться со знака "+" и содержать 12 цифр',
    password:
        'Пароль может состоять только из цифр, латинских и специальных символов',
    'password-repeat': 'Пароли не совпадают',
}

const INPUT_REG_EXPS = {
    email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
    phone: /^\+\d{12}$/,
    password: /^[0-9a-zA-Z!@#$%^&*_]+$/,
    EMAIL: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
    PHONE: /^\+\d{12}$/,
    PASSWORD: /^[0-9a-zA-Z!@#$%^&*_]+$/,
}
const INPUT_STATES = {
    error: 'error',
    warning: 'error',
    ERROR: 'error',
    WARNING: 'error',
}

let globalErrorLog = ''

export function validateRegistrationInputs(reg_inputs, info_element = null) {
    globalErrorLog = ''
    clearErrors(reg_inputs, info_element)

    if (!isRequiredInputsFilled(reg_inputs)) {
        showErrorsLog(info_element)
        return false
    }

    if (!isInputsValid(reg_inputs)) {
        showErrorsLog(info_element)
        return false
    }

    const passwordInput_value = reg_inputs.password.value
    const passwordRepeatInput_value = reg_inputs['password-repeat'].value

    if (passwordInput_value !== passwordRepeatInput_value) {
        const message = ERROR_MESSAGES['password-repeat']
        const extendedMessage = EXTENDED_ERROR_MESSAGES['password-repeat']
        updateInputState(reg_inputs.password, message, INPUT_STATES.error)
        updateInputState(reg_inputs['password'], message, INPUT_STATES.error)
        addErrorToLog(extendedMessage)

        showErrorsLog(info_element)
        return false
    }

    return true
}

function isRequiredInputsFilled(reg_inputs) {
    let isValid = true

    const emailInput_value = reg_inputs.email.value
    const phoneInput_value = reg_inputs.phone.value
    const passwordInput_value = reg_inputs.password.value

    if (!emailInput_value && !phoneInput_value) {
        const message =
            'Хотя бы одно поле: почта или телефон, должны быть заполнены'
        updateInputState(reg_inputs.email, message, INPUT_STATES.warning)
        updateInputState(reg_inputs.phone, message, INPUT_STATES.warning)
        addErrorToLog(message)
        isValid = false
    }

    if (!passwordInput_value) {
        const message = 'Пароль не может быть пустым'
        updateInputState(reg_inputs.password, message, INPUT_STATES.error)
        addErrorToLog(message)
        isValid = false
    }

    return isValid
}

function isInputsValid(reg_inputs) {
    let isValid = true

    const emailInput_value = reg_inputs.email.value
    const phoneInput_value = reg_inputs.phone.value
    const passwordInput_value = reg_inputs.password.value

    const isEmailValid = emailInput_value.match(INPUT_REG_EXPS.email) !== null
    const isPhoneValid = phoneInput_value.match(INPUT_REG_EXPS.phone) !== null
    const isPasswordValid =
        passwordInput_value.match(INPUT_REG_EXPS.password) !== null

    if (emailInput_value && !isEmailValid) {
        const message = ERROR_MESSAGES.email
        const extendedMessage = EXTENDED_ERROR_MESSAGES.email
        updateInputState(reg_inputs.email, message, INPUT_STATES.error)
        addErrorToLog(extendedMessage)
        isValid = false
    }

    if (phoneInput_value && !isPhoneValid) {
        const message = ERROR_MESSAGES.phone
        const extendedMessage = EXTENDED_ERROR_MESSAGES.phone
        updateInputState(reg_inputs.phone, message, INPUT_STATES.error)
        addErrorToLog(extendedMessage)
        isValid = false
    }

    if (passwordInput_value && !isPasswordValid) {
        const message = ERROR_MESSAGES.password
        const extendedMessage = EXTENDED_ERROR_MESSAGES.password
        updateInputState(reg_inputs.password, message, INPUT_STATES.error)
        addErrorToLog(extendedMessage)
        isValid = false
    }

    return isValid
}

function addErrorToLog(message) {
    const valErrorItem = `<div class="form-info-item error-item">${message}</div>`
    globalErrorLog += valErrorItem
}

function updateInputState(input, message, state) {
    const inputContainer = input.closest('.input-container')

    if (inputContainer === null) {
        input.classList.add(state)
        return
    }

    inputContainer.classList.add(state)

    const inputInfo = inputContainer.querySelector('.input-info')

    if (inputInfo !== null) {
        inputInfo.textContent = message
    }
}

function clearErrors(inputs, info_element = null) {
    if (info_element !== null) {
        info_element.innerHTML = ''
    }

    for (let inputName in inputs) {
        const curInput = inputs[inputName]
        const inputContainer = curInput.closest('.input-container')

        if (inputContainer === null) {
            curInput.classList.remove('error')
            return
        }

        inputContainer.classList.remove('error')

        const inputInfo = inputContainer.querySelector('.input-info')

        if (inputInfo !== null) {
            inputInfo.textContent = ''
        }
    }
}

function showErrorsLog(info_element) {
    if (info_element !== null) {
        info_element.innerHTML = globalErrorLog
    }
}

function old__validateAuthInputs(auth_inputs, info_element = null) {
    globalErrorLog = ''
    let isValid = true

    clearErrors(auth_inputs, info_element)

    for (let inputName in auth_inputs) {
        const inputValue = auth_inputs[inputName].value

        const isRepeatInput = inputName.includes('repeat')

        if (isRepeatInput) {
            const suffixIndex = inputName.indexOf('-repeat')
            const inputToRepeatName = inputName.slice(0, suffixIndex)
            const inputToRepeatValue = auth_inputs[inputToRepeatName].value

            if (inputValue !== inputToRepeatValue) {
                showError(auth_inputs[inputName], ERROR_MESSAGES[inputName])
                addErrorToLog(EXTENDED_ERROR_MESSAGES[inputName])
                isValid = false
            }

            continue
        }

        const isCurInputValid =
            inputValue.match(INPUT_REG_EXPS[inputName]) !== null

        if (isCurInputValid) {
            continue
        }

        showError(auth_inputs[inputName], ERROR_MESSAGES[inputName])
        addErrorToLog(EXTENDED_ERROR_MESSAGES[inputName])
        isValid = false
    }

    if (!isValid && info_element !== null) {
        info_element.innerHTML = globalErrorLog
    }

    return isValid
}
