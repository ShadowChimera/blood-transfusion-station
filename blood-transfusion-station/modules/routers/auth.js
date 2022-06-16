'use strict'

const express = require('express')
const router = express.Router()

const urlencodedParser = express.urlencoded({ extended: false })
const jsonParser = express.json()

router.get('/sign-up', (req, res) => {
    if (global.__user.authorized) {
        res.redirect('/profile')
        return
    }

    res.status(200).type('text/html')
    res.sendFile(`public/html/${global.__user.type}/sign-up.html`, {
        root: global.__basedir,
    })
})

router.post('/sign-up', urlencodedParser, (req, res) => {
    const signUp = require(`${global.__basedir}/api/auth/sign-up.js`)
    signUp(req, res)
})

router.get('/sign-in', (req, res) => {
    if (global.__user.authorized) {
        res.redirect('/profile')
        return
    }

    res.status(200).type('text/html')
    res.sendFile(`public/html/${global.__user.type}/sign-in.html`, {
        root: global.__basedir,
    })
})

router.post('/sign-in', urlencodedParser, (req, res) => {
    const signIn = require(`${global.__basedir}/api/auth/sign-in.js`)
    signIn(req, res)
})

module.exports = router
