const header_element = document.getElementById('main-header')
const logoutButton = header_element.querySelector('#log-out-button')
const authorizationStatus_element = header_element.querySelector(
    '.authorization-status'
)

doAfterAuthCheck(updateHeader)

logoutButton.addEventListener('click', sendLogoutRequest)

function updateHeader() {
    if (!isAuthorized) {
        return
    }

    authorizationStatus_element.textContent = 'You are logged in'
    logoutButton.style.visibility = 'visible'
}
