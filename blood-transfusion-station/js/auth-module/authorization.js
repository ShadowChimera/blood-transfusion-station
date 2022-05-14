'use strict'

import { REQUEST_TYPES, sendAuthRequest } from './auth-request.js'
import { processForm } from './form-processing.js'

document.addEventListener('DOMContentLoaded', main)

const processedForms = {}

function main() {
    const donor_authForm = document.getElementById('donor-authorization-form')
    const hospital_authForm = document.getElementById(
        'hospital-authorization-form'
    )

    let processedForm = processForm(donor_authForm, authorize)
    // let processedForm = processForm(donor_authForm, test)
    processedForms[processedForm.formName] = processedForm

    // processedForm = processForm(hospital_authForm, register)
    // forms[processForm.formName] = processForm
}

// ````````````

function test(e) {
    const authorization_data = new FormData(processedForms.donor.formElement)
    for (var pair of authorization_data.entries()) {
        console.log(pair[0] + ', ' + pair[1])
    }
}

async function authorize(e) {
    e.preventDefault()

    const formName = e.currentTarget.closest('.form').getAttribute('name')
    const processedForm = processedForms[formName]
    const userType = formName

    const authorization_data = new FormData(processedForm.formElement)
    authorization_data.append('user-type', userType)

    let response = await sendAuthRequest(
        authorization_data,
        REQUEST_TYPES.authorization
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
