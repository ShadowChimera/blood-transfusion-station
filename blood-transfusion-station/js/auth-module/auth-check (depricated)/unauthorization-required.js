doAfterAuthCheck(() => {
    if (!isAuthorized) {
        return
    }

    // window.location.href = '/authorization.html'
    console.log('you are already logged in')
})
