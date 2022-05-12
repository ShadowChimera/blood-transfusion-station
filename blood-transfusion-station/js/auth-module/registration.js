'use strict'

import { REQUEST_TYPES, sendAuthRequest } from './auth-request.js'
// import { REQUEST_TYPES, AuthRequest } from './auth-request.js'
import { validateRegistrationInputs } from './data-validation.js'

let registration_form = null
let registration_inputs = {}
let registration_formInfo = null
let registration_button = null

document.addEventListener('DOMContentLoaded', main)

function main() {
    registration_form = document.getElementById('registration-form')

    const registration_inputs_list =
        registration_form.querySelectorAll('.input')
    for (let registration_input of registration_inputs_list) {
        const inputName = registration_input.getAttribute('name')
        registration_inputs[inputName] = registration_input
    }

    registration_formInfo =
        registration_form.querySelector('.form-info') ?? null

    registration_button = registration_form.querySelector(
        '#registration-button'
    )
    registration_button.addEventListener('click', register)
}

// ````````````

async function register(e) {
    e.preventDefault()

    if (
        !validateRegistrationInputs(registration_inputs, registration_formInfo)
    ) {
        return
    }

    const registration_data = new FormData(registration_form)

    let response = await sendAuthRequest(
        registration_data,
        REQUEST_TYPES.REGISTRATION
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
            registration_formInfo.innerHTML += `<b>Error</b>${serverMessage.message}`
            return
        }

        console.log(serverMessage.message)
        registration_formInfo.innerHTML += `<h6>Message</h6>${serverMessage.message}`
    })
}
