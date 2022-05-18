const CHECK_AUTHORIZATION_PHP_NAME = 'auth-module/check-authorization.php'
const URL_CHECK_AUTHORIZATION_PHP = `/php/${CHECK_AUTHORIZATION_PHP_NAME}`
// const URL_CHECK_AUTHORIZATION_PHP = '/php/auth-module/check-authorization.php'

let isAuthorizationChecked = false
let isAuthorized = false
checkAuthorization()

async function checkAuthorization() {
    let serverResponses = await sendAuthCheckingRequest()

    console.log(serverResponses)

    serverResponses = JSON.parse(serverResponses)

    serverResponses.forEach((response) => {
        if (
            response.status === 'ok' &&
            response.from === CHECK_AUTHORIZATION_PHP_NAME
        ) {
            isAuthorized = response.result
            return
        }

        console.log(response)
    })

    isAuthorizationChecked = true
}

async function sendAuthCheckingRequest() {
    const response = await fetch(URL_CHECK_AUTHORIZATION_PHP, {
        method: 'GET',
    })

    if (!response.ok) {
        const statusInfo = `${response.status}: ${response.statusText}`
        return statusInfo
    }

    let result = await response.text()
    return result
}
