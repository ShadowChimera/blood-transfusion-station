'use strict'

import { REQUEST_TYPES, sendAuthRequest } from './auth-request.js'
import { validateRegistrationInputs } from './data-validation.js'

let authorization_forms = {
    donor: {},
    hospital: {},
}

document.addEventListener('DOMContentLoaded', main)

function main() {
    authorization_forms.donor.formElement = document.getElementById(
        'donor-authorization-form'
    )
    authorization_forms.hospital.formElement = document.getElementById(
        'hospital-authorization-form'
    )

    addFormsElements(authorization_forms)
}

function addFormsElements(forms) {
    for (let formName in forms) {
        if (forms[formName].formElement === null) {
            continue
        }

        forms[formName].inputElements = {}

        const inputs = forms[formName].formElement.querySelectorAll('.input')

        for (let input of inputs) {
            const inputName = input.getAttribute('name')
            forms[formName].inputElements[inputName] = input
        }

        forms[formName].infoElement =
            forms[formName].formElement.querySelector('.form-info') ?? null

        forms[formName].submitButton =
            forms[formName].formElement.querySelector('input[type=submit]')

        forms[formName].submitButton.addEventListener('click', authorize)
    }

    return forms
}

// ````````````

async function authorize(e) {
    e.preventDefault()

    const authorization_form = e.currentTarget.closest('.form')

    /*
        !   Добавить регистрацию второго типа пользователя
        *   const userType = registration_form.getAttribute('name')
    */

    if (
        !validateAuthorizationInputs(registration_inputs, registration_formInfo)
    ) {
        return
    }

    const authorization_data = new FormData(authorization_form)

    let response = await sendAuthRequest(
        authorization_data,
        REQUEST_TYPES.authorization
    )
    console.log(response)

    response = JSON.parse(response)
    console.log(response)

    showServerResponse(response)
}

function showServerResponse(response) {
    registration_formInfo.innerHTML = ''
    response.forEach((serverMessage) => {
        if (!serverMessage.status !== 'ok') {
            console.log(serverMessage.message)
            registration_formInfo.innerHTML +=
                '<b>Error</b>' + serverMessage.message
            return
        }

        console.log(serverMessage.message)
        registration_formInfo.innerHTML +=
            '<b>Message</b>' + serverMessage.message
    })
}
