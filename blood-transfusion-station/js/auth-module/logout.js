const URL_LOGOUT_PHP = '/php/auth-module/logout.php'

async function sendLogoutRequest() {
    const response = await fetch(URL_LOGOUT_PHP, {
        method: 'GET',
    })

    if (!response.ok) {
        const statusInfo = `${response.status}: ${response.statusText}`
        return statusInfo
    }

    window.location.reload()
}
