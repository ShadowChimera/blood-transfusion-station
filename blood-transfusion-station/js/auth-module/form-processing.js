'use strict'

import * as DataValidation from './data-validation.js'

const ERROR_MESSAGES = {
    emailOrPhoneRequired: 'Одно из этих полей должно быть заполнено',
    passwordRequired: 'Пароль не может быть пустым',
    repeatPasswordRequired: 'Необходимо повторить пароль',
    emailValidation: 'Неверный формат почты',
    phoneValidation: 'Неверный формат телефона',
    loginValidation: 'Неверный формат',
    passwordValidation: 'Неверный формат пароля',
    repeatPasswordValidation: 'Пароли не совпадают',
}

const EXTENDED_ERROR_MESSAGES = {
    emailOrPhoneRequired:
        'Одно из полей: "Почта", "Телефон", должно быть заполнено',
    passwordRequired: 'Пароль не может быть пустым',
    repeatPasswordRequired: 'Необходимо повторить пароль',
    emailValidation: 'Неверный формат почты',
    phoneValidation:
        'Телефон должен начинаться со знака "+" и содержать 12 цифр',
    loginValidation: 'Неверный формат почты или телефона',
    passwordValidation:
        'Пароль может состоять только из цифр и латинских и специальных символов',
    repeatPasswordValidation: 'Пароли не совпадают',
}

const VALIDATORS = {
    email: emailValidator,
    phone: phoneValidator,
    login: loginValidator,
    password: passwordValidator,
    'repeat-password': repeatPasswordValidator,
}

const INPUT_STATES = {
    error: 'error',
    warning: 'warning',
}

const customInputStates = []

// ````````

let errorLog = ''

let onSubmitCallback = null
let inputs = null
let infoElement = null

export function processForm(form, onSubmit = null) {
    const formName = form.getAttribute('name')

    inputs = form.querySelectorAll('.input')
    infoElement = form.querySelector('.form-info')
    const submitButton = form.querySelector('input[type=submit]')

    for (let input of inputs) {
        const inputName = input.getAttribute('name')
        if (inputName in VALIDATORS) {
            input.addEventListener('change', VALIDATORS[inputName])
        }
    }

    onSubmitCallback = onSubmit
    submitButton.addEventListener('click', validateInputs)

    return {
        formName: formName,
        formElement: form,
        infoElement: infoElement,
        inputs: inputs,
    }
}

// * Validators *
// *

function emailValidator(e) {
    return emailValidate(e.currentTarget)
}

function phoneValidator(e) {
    return phoneValidate(e.currentTarget)
}

function loginValidator(e) {
    return loginValidate(e.currentTarget)
}

function passwordValidator(e) {
    return passwordValidate(e.currentTarget)
}

function repeatPasswordValidator(e) {
    return repeatPasswordValidate(e.currentTarget, e.isTrusted)
}

// *
// * / *

// * Validation *
// *

function validateInputs(e) {
    e.preventDefault()

    errorLog = ''

    for (let input of inputs) {
        if ('createEvent' in document) {
            let event = document.createEvent('HTMLEvents')
            event.initEvent('change', false, true)
            input.dispatchEvent(event)
        } else {
            input.fireEvent('onchange')
        }
    }

    infoElement.innerHTML = errorLog

    if (errorLog) {
        e.preventDefault()
        return
    }

    if (onSubmitCallback) {
        onSubmitCallback(e)
    }
}

function emailValidate(emailInput) {
    clearInputStates(emailInput)

    const emailValue = emailInput.value.toLowerCase()
    const phoneInput =
        emailInput.closest('.form')?.querySelector('.input[name=phone]') ?? null

    if (phoneInput) {
        clearInputState(phoneInput, INPUT_STATES.warning)
    }

    if (!emailValue && phoneInput !== null) {
        const phoneInputValue = phoneInput.value

        if (!phoneInputValue) {
            updateInputState(
                emailInput,
                ERROR_MESSAGES.emailOrPhoneRequired,
                INPUT_STATES.warning
            )
            updateInputState(
                phoneInput,
                ERROR_MESSAGES.emailOrPhoneRequired,
                INPUT_STATES.warning
            )
            addToErrorLog(EXTENDED_ERROR_MESSAGES.emailOrPhoneRequired)

            return
        }
    }

    if (!DataValidation.isEmailValid(emailValue)) {
        updateInputState(
            emailInput,
            ERROR_MESSAGES.emailValidation,
            INPUT_STATES.error
        )
        addToErrorLog(EXTENDED_ERROR_MESSAGES.emailValidation)
    }
}

function phoneValidate(phoneInput) {
    clearInputStates(phoneInput)

    const phoneValue = phoneInput.value
    const emailInput =
        phoneInput.closest('.form')?.querySelector('.input[name=email]') ?? null

    if (emailInput) {
        clearInputState(emailInput, INPUT_STATES.warning)
    }

    if (!phoneValue && emailInput !== null) {
        const emailInputValue = emailInput.value

        if (!emailInputValue) {
            updateInputState(
                emailInput,
                ERROR_MESSAGES.emailOrPhoneRequired,
                INPUT_STATES.warning
            )
            updateInputState(
                phoneInput,
                ERROR_MESSAGES.emailOrPhoneRequired,
                INPUT_STATES.warning
            )
            // addToErrorLog(EXTENDED_ERROR_MESSAGES.emailOrPhoneRequired)

            return
        }
    }

    if (!DataValidation.isPhoneValid(phoneValue)) {
        updateInputState(
            phoneInput,
            ERROR_MESSAGES.phoneValidation,
            INPUT_STATES.error
        )
        addToErrorLog(EXTENDED_ERROR_MESSAGES.phoneValidation)
    }
}

function loginValidate(loginInput) {
    clearInputStates(loginInput)

    const loginValue = loginInput.value.toLowerCase()

    if (!DataValidation.isLoginValid(loginValue)) {
        updateInputState(
            loginInput,
            ERROR_MESSAGES.loginValidation,
            INPUT_STATES.error
        )
        addToErrorLog(EXTENDED_ERROR_MESSAGES.loginValidation)
    }
}

function passwordValidate(passwordInput) {
    clearInputStates(passwordInput)

    const passwordValue = passwordInput.value

    if (!passwordValue) {
        updateInputState(
            passwordInput,
            ERROR_MESSAGES.passwordRequired,
            INPUT_STATES.error
        )
        addToErrorLog(EXTENDED_ERROR_MESSAGES.passwordRequired)

        return
    }

    if (!DataValidation.isPasswordValid(passwordValue)) {
        updateInputState(
            passwordInput,
            ERROR_MESSAGES.passwordValidation,
            INPUT_STATES.error
        )
        addToErrorLog(EXTENDED_ERROR_MESSAGES.passwordValidation)
    }
}

function repeatPasswordValidate(repeatPasswordInput, isTrusted = true) {
    clearInputStates(repeatPasswordInput)

    const repeatPasswordValue = repeatPasswordInput.value

    if (!repeatPasswordValue) {
        updateInputState(
            repeatPasswordInput,
            ERROR_MESSAGES.repeatPasswordRequired,
            INPUT_STATES.error
        )
        addToErrorLog(EXTENDED_ERROR_MESSAGES.repeatPasswordRequired)

        return
    }

    if (isTrusted) {
        return
    }

    const passwordInput =
        repeatPasswordInput
            .closest('.form')
            ?.querySelector('.input[name=password]') ?? null

    if (passwordInput === null) {
        updateInputState(
            passwordInput,
            ERROR_MESSAGES.repeatPasswordValidation,
            INPUT_STATES.error
        )

        addToErrorLog('Поле с паролем не может быть найдено')

        return
    }

    const passwordValue = passwordInput.value

    if (passwordValue !== repeatPasswordValue) {
        updateInputState(
            passwordInput,
            ERROR_MESSAGES.repeatPasswordValidation,
            INPUT_STATES.error
        )
        updateInputState(
            repeatPasswordInput,
            ERROR_MESSAGES.repeatPasswordValidation,
            INPUT_STATES.error
        )
        addToErrorLog(EXTENDED_ERROR_MESSAGES.repeatPasswordValidation)
    }

    // passwordValidate(passwordInput)
}

// *
// * / *

// * Inputs Update *
// *

function updateInputState(input, message, state) {
    const inputContainer = input.closest('.input-container')
    const toUpdate = inputContainer ?? input
    const inputInfo = inputContainer?.querySelector('.input-info') ?? null

    if (!(state in INPUT_STATES) && !customInputStates.includes(state)) {
        customInputStates.push(state)
    }

    toUpdate.classList.add(state)

    if (inputInfo !== null) {
        inputInfo.textContent = message
    }
}

function clearInputState(input, state) {
    const inputContainer = input.closest('.input-container')
    const toClear = inputContainer ?? input
    const inputInfo = inputContainer?.querySelector('.input-info') ?? null

    if (inputInfo !== null) {
        inputInfo.textContent = ''
    }

    toClear.classList.remove(state)
}

function clearInputStates(input) {
    const inputContainer = input.closest('.input-container')
    const toClear = inputContainer ?? input
    const inputInfo = inputContainer?.querySelector('.input-info') ?? null

    if (inputInfo !== null) {
        inputInfo.textContent = ''
    }

    for (let curState in INPUT_STATES) {
        toClear.classList.remove(curState)
    }

    customInputStates.forEach((curState) => {
        toClear.classList.remove(curState)
    })
}

function addToErrorLog(message) {
    errorLog += `<div class="form-info-item error-item">${message}</div>`
}

// *
// * / *
