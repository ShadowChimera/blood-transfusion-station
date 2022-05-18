const DELAY = 10
const LIMITER = 10000
let curTime = 0

let toDoQueue = []

let timerId = setInterval(() => {
    curTime += DELAY

    if (!isAuthorizationChecked) {
        if (curTime > LIMITER) {
            clearTimeout(timerId)
            timerId = null
            console.log('request time exceeded the limit')
        }

        return
    }

    clearTimeout(timerId)
    timerId = null

    toDoQueue.forEach((action) => {
        action()
    })
    toDoQueue = []
}, DELAY)

function doAfterAuthCheck(action) {
    if (!timerId) {
        action()
        return
    }

    toDoQueue.push(action)
}
