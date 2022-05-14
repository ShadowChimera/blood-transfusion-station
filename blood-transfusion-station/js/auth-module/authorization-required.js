doAfterAuthCheck(() => {
    if (isAuthorized) {
        return
    }

    window.location.href = '/authorization.html'
})
