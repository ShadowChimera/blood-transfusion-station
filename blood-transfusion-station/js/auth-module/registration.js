'use strict'

import { REQUEST_TYPES, sendAuthRequest } from './auth-request.js'
import { processForm } from './form-processing.js'

document.addEventListener('DOMContentLoaded', main)

const processedForms = {}

function main() {
    const donor_regForm = document.getElementById('donor-registration-form')
    const hospital_regForm = document.getElementById(
        'hospital-registration-form'
    )

    let processedForm = processForm(donor_regForm, register)
    processedForms[processedForm.formName] = processedForm

    // processedForm = processForm(hospital_regForm, register)
    // forms[processForm.formName] = processForm
}

// ````````````

async function register(e) {
    e.preventDefault()

    const formName = e.currentTarget.closest('.form').getAttribute('name')
    const processedForm = processedForms[formName]
    const userType = formName

    const registration_data = new FormData(processedForm.formElement)
    registration_data.append('user-type', userType)

    let response = await sendAuthRequest(
        registration_data,
        REQUEST_TYPES.registration
    )
    console.log(response)

    response = JSON.parse(response)
    console.log(response)

    showServerResponse(response, processedForm.infoElement)
}

function showServerResponse(response, infoElement) {
    infoElement.innerHTML = ''
    response.forEach((serverMessage) => {
        if (serverMessage.status !== 'ok') {
            console.log(serverMessage.message)
            infoElement.innerHTML += '<b>Error</b>' + serverMessage.message
            return
        }

        console.log(serverMessage.message)
        infoElement.innerHTML += '<b>Message</b>' + serverMessage.message
    })
}
