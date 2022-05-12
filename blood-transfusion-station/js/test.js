'use strict'

const TEST_PHP_URL = '/php/auth-module/registration.php'
// const TEST_PHP_URL = '/php/test.php'
let result_block = null

document.addEventListener('DOMContentLoaded', main)

function main() {
    result_block = document.getElementById('common-server-answer')

    sendRequest()
}

async function sendRequest() {
    const registration_data = new FormData()

    registration_data.append('email', 'another@gmail.com')
    registration_data.append('phone', '+380123456788')
    registration_data.append('password', 'test_password')

    const response = await fetch(TEST_PHP_URL, {
        method: 'POST',
        body: registration_data,
    })

    if (!response.ok) {
        const statusInfo = `${response.status}: ${response.statusText}`
        console.log(statusInfo)
        result_block.textContent = statusInfo
        return
    }

    // const serverAnswers = await response.json()
    let serverAnswers = await response.text()
    console.log(serverAnswers)
    serverAnswers = JSON.parse(serverAnswers)

    result_block.innerHTML = ''
    serverAnswers.forEach((serverAnswer) => {
        if (!serverAnswer.status !== 'ok') {
            console.log(serverAnswer.message)
            result_block.innerHTML += serverAnswer.message
            return
        }

        console.log(serverAnswer.message)
        result_block.innerHTML += serverAnswer.message
    })
}
