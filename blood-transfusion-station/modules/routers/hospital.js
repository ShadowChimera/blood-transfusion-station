'use strict'

const express = require('express')
const router = express.Router()

const urlencodedParser = express.urlencoded({ extended: false })
const jsonParser = express.json()

router.get('/send-blood-request', (req, res) => {
    if (!global.__user.authorized) {
        res.redirect('/sign-in')
        return
    }

    if (global.__user.type !== 'hospital') {
        return
    }

    res.status(200).type('text/html')
    res.sendFile(`public/html/${global.__user.type}/send-blood-request.html`, {
        root: global.__basedir,
    })
})

router.get('/api/hospital/user-info/get-user-info', (req, res) => {
    const getUserInfo = require(`${global.__basedir}/api/hospital/user-info/get-user-info.js`)
    getUserInfo(req, res)
})

router.get('/api/hospital/blood-requests/get-blood-requests', (req, res) => {
    const getRequests = require(`${global.__basedir}/api/hospital/blood-requests/get-blood-requests.js`)
    getRequests(req, res)
})

// router.post(
//     '/api/donor/restrictions/add-restrictions',
//     jsonParser,
//     (req, res) => {
//         const addRestrictions = require(`${global.__basedir}/api/donor/restrictions/add-restrictions.js`)
//         addRestrictions(req, res)
//     }
// )

module.exports = router
