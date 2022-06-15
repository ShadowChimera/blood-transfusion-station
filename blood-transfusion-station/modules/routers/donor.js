'use strict'

const express = require('express')
const router = express.Router()

router.get('/my-restrictions', (req, res) => {
    if (!global.__user.authorized) {
        res.redirect('/sign-in')
        return
    }

    if (global.__user.type !== 'donor') {
        return
    }

    res.status(200).type('text/html')
    res.sendFile(`public/html/${global.__user.type}/my-restrictions.html`, {
        root: global.__basedir,
    })
})

router.get('/my-donations', (req, res) => {
    if (!global.__user.authorized) {
        res.redirect('/sign-in')
        return
    }

    if (global.__user.type !== 'donor') {
        return
    }

    res.status(200).type('text/html')
    res.sendFile(`public/html/${global.__user.type}/my-donations.html`, {
        root: global.__basedir,
    })
})

router.get('/my-donations', (req, res) => {
    if (!global.__user.authorized) {
        res.redirect('/sign-in')
        return
    }

    if (global.__user.type !== 'donor') {
        return
    }

    res.status(200).type('text/html')
    res.sendFile(`public/html/${global.__user.type}/my-donations.html`, {
        root: global.__basedir,
    })
})

router.get('/my-tests', (req, res) => {
    if (!global.__user.authorized) {
        res.redirect('/sign-in')
        return
    }

    if (global.__user.type !== 'donor') {
        return
    }

    res.status(200).type('text/html')
    res.sendFile(`public/html/${global.__user.type}/my-tests.html`, {
        root: global.__basedir,
    })
})

router.get('/notifications-settings', (req, res) => {
    if (!global.__user.authorized) {
        res.redirect('/sign-in')
        return
    }

    if (global.__user.type !== 'donor') {
        return
    }

    res.status(200).type('text/html')
    res.sendFile(
        `public/html/${global.__user.type}/notifications-settings.html`,
        {
            root: global.__basedir,
        }
    )
})

module.exports = router
