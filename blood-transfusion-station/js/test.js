const REGISTRATION_PHP_URL = '/php/auth-module/registration.php'
let result_block = null

document.addEventListener('DOMContentLoaded', main)

function main() {
    result_block = document.getElementById('common-server-answer')

    // sendRequest()
}

async function sendRequest() {
    const registration_data = new FormData()

    registration_data.append('email', 'some@gmail.com')
    registration_data.append('phone', '+380123456789')
    registration_data.append('password', 'test_password')

    const response = await fetch(REGISTRATION_PHP_URL, {
        method: 'POST',
        body: registration_data,
    })

    if (!response.ok) {
        const statusInfo = `${response.status}: ${response.statusText}`
        console.log(statusInfo)
        result_block.textContent = statusInfo
        return
    }

    const serverAnswer = await response.json()
    // const serverAnswer = await response.text()
    console.log(serverAnswer)

    if (!serverAnswer.status !== 'ok') {
        console.log(serverAnswer.message)
        result_block.innerHTML = serverAnswer.message
        return
    }

    console.log(serverAnswer.message)
    result_block.innerHTML = serverAnswer.message
}
