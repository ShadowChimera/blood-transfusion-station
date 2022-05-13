'use strict'

import { REQUEST_TYPES, sendAuthRequest } from './auth-request.js'
import { processForm } from './form-processing.js'

let authorization_forms = {
    donor: {},
    hospital: {},
}

document.addEventListener('DOMContentLoaded', main)

function main() {
    authorization_forms.donor.formElement = document.getElementById(
        'donor-registration-form'
    )
    authorization_forms.hospital.formElement = document.getElementById(
        'hospital-registration-form'
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

        forms[formName].submitButton.addEventListener('click', register)
    }

    return forms
}

// ````````````

async function register(e) {
    e.preventDefault()

    const registration_form = e.currentTarget.closest('.form')
    const formName = registration_form.getAttribute('name')

    /*
        !   Добавить регистрацию второго типа пользователя
        *   const userType = formName
    */

    if (
        !validateAuthorizationInputs(
            authorization_forms[formName].inputElements,
            authorization_forms[formName].infoElement
        )
    ) {
        return
    }

    const registration_data = new FormData(registration_form)

    let response = await sendAuthRequest(
        registration_data,
        REQUEST_TYPES.registration
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
