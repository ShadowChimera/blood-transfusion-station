'use strict'

global.__basedir = __dirname

// Модули ===================================================================

const express = require('express')

const app = express()

// Парсеры ===================================================================

// ? парсер для данных application/x-www-form-urlencoded
// ? extended: true => support qs (nested objects: ...?nest[obj]=value => nest = {obj: 'value'})
const urlencodedParser = express.urlencoded({ extended: false })

// ? парсер для данных в формате json
const jsonParser = express.json()

// Переменные ===================================================================

const mainOptions = {
    server: {
        host: '127.0.0.1',
        port: 80,
    },
}

const USER_TYPES = {
    guest: 0,
    donor: 1,
    hospital: 2,
    employee: 3,
    head: 4,
}

global.__user = {
    authorized: true,
    type: 'donor',
}

//  Маршрутизация ===================================================================

const donorRouter = require(`${global.__basedir}/modules/routers/donor.js`)

app.get('/', (req, res) => {
    res.status(200).type('text/html')

    res.sendFile(`public/html/${global.__user.type}/home.html`, {
        root: global.__basedir,
    })
})

app.use(express.static(`${global.__basedir}/public`))

app.use(donorRouter)

app.get('/profile', (req, res) => {
    if (!global.__user.authorized) {
        res.redirect('/sign-in')
        return
    }

    res.status(200).type('text/html')
    res.sendFile(`public/html/${global.__user.type}/profile.html`, {
        root: global.__basedir,
    })
})

app.get('/sign-up', (req, res) => {
    if (global.__user.authorized) {
        res.redirect('/profile')
        return
    }

    res.status(200).type('text/html')
    res.sendFile(`public/html/${global.__user.type}/sign-up.html`, {
        root: global.__basedir,
    })
})

app.post('/sign-up', urlencodedParser, (req, res) => {
    const signUp = require(`${global.__basedir}/api/auth/sign-up.js`)
    signUp(req, res)
})

app.get('/sign-in', (req, res) => {
    if (global.__user.authorized) {
        res.redirect('/profile')
        return
    }

    res.status(200).type('text/html')
    res.sendFile(`public/html/${global.__user.type}/sign-in.html`, {
        root: global.__basedir,
    })
})

app.post('/sign-in', urlencodedParser, (req, res) => {
    const signIn = require(`${global.__basedir}/api/auth/sign-in.js`)
    signIn(req, res)
})

app.use((req, res, next) => {
    res.sendStatus(404)
})

// Сервер ===================================================================

app.listen(mainOptions.server.port, mainOptions.server.host, () => {
    console.log(
        `Server listens http://${mainOptions.server.port}:${mainOptions.server.host}`
    )
})
