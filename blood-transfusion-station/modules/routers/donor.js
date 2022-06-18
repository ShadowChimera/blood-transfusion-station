'use strict'

const express = require('express')
const router = express.Router()

const urlencodedParser = express.urlencoded({ extended: false })
const jsonParser = express.json()

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

router.get('/appointment', (req, res) => {
    if (!global.__user.authorized) {
        res.redirect('/sign-in')
        return
    }

    if (global.__user.type !== 'donor') {
        return
    }

    res.status(200).type('text/html')
    res.sendFile(`public/html/${global.__user.type}/appointment.html`, {
        root: global.__basedir,
    })
})

router.get('/api/donor/user-info/get-user-info', (req, res) => {
    const getUserInfo = require(`${global.__basedir}/api/donor/user-info/get-user-info.js`)
    getUserInfo(req, res)
})

router.get('/api/donor/restrictions/get-restrictions', (req, res) => {
    const getRestrictions = require(`${global.__basedir}/api/donor/restrictions/get-restrictions.js`)
    getRestrictions(req, res)
})

router.post(
    '/api/donor/restrictions/add-restrictions',
    jsonParser,
    (req, res) => {
        const addRestrictions = require(`${global.__basedir}/api/donor/restrictions/add-restrictions.js`)
        addRestrictions(req, res)
    }
)

router.get('/api/donor/donations/get-donations', (req, res) => {
    const getDonations = require(`${global.__basedir}/api/donor/donations/get-donations.js`)
    getDonations(req, res)
})

router.get('/api/donor/donations/get-tests', (req, res) => {
    const getTests = require(`${global.__basedir}/api/donor/donations/get-tests.js`)
    getTests(req, res)
})

router.post('/api/donor/donations/get-test-info', jsonParser, (req, res) => {
    const getTestInfo = require(`${global.__basedir}/api/donor/donations/get-test-info.js`)
    getTestInfo(req, res)
})

module.exports = router
