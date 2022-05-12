let registrationData = null

let registration_form = null
let registration_inputs = {}
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

    registration_button = registration_form.querySelector(
        '#registration-button'
    )
    registration_button.addEventListener('click', register)
}

// ````````````

async function register(e) {
    e.preventDefault()

    const registration_data = getValidRegistrationData()

    if (registration_data === null) {
        return
    }

    let response = await sendRegistrationRequest(registration_data)
    console.log(response)

    response = JSON.parse(response)
    console.log(response)

    showServerResponse(response)
}

function getValidRegistrationData() {
    const registrationData = new FormData(registration_form)

    return null
}

function showServerResponse(response) {
    result_block.innerHTML = ''
    response.forEach((serverMessage) => {
        if (!serverMessage.status !== 'ok') {
            console.log(serverMessage.message)
            result_block.innerHTML += `<h6>Error</h6>${serverMessage.message}`
            return
        }

        console.log(serverMessage.message)
        result_block.innerHTML += `<h6>Message</h6>${serverMessage.message}`
    })
}

async function sendRegistrationRequest(registrationData, url) {
    const response = await fetch(url, {
        method: 'POST',
        body: registrationData,
    })

    if (!response.ok) {
        const statusInfo = `${response.status}: ${response.statusText}`
        return statusInfo
    }

    let result = await response.text()
    return result

    // return new Promise((resolve, reject) => {
    //     if (!response.ok) {
    //         const statusInfo = `${response.status}: ${response.statusText}`
    //         reject(statusInfo)
    //         return
    //     }

    //     let serverAnswer = await response.text()
    //     resolve(serverAnswer)
    // })
}
