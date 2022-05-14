const DELAY = 10
const LIMITER = 10000
let curTime = 0

let timerId = setInterval(() => {
    curTime += DELAY

    if (curTime > LIMITER) {
        clearTimeout(timerId)
        console.log('request time exceeded the limit')
    }

    if (!isAuthorizationChecked) {
        return
    }

    clearTimeout(timerId)

    if (isAuthorized) {
        return
    }

    window.location.href = '/authorization.html'
}, DELAY)
