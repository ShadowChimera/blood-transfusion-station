'use strict'

const urlsByRequestType = {
    registration: '/php/auth-module/registration.php',
    authorization: '/php/auth-module/authorization.php',
}

export const REQUEST_TYPES = {
    REGISTRATION: 'registration',
    AUTHORIZATION: 'authorization',
}

export async function sendAuthRequest(authData, type) {
    const url = urlsByRequestType[REQUEST_TYPES[type]]
    const response = await fetch(url, {
        method: 'POST',
        body: authData,
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
