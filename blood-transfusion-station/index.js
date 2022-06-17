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
    type: 'hospital',
}

//  Маршрутизация ===================================================================

const donorRouter = require(`${global.__basedir}/modules/routers/donor.js`)
const hospitalRouter = require(`${global.__basedir}/modules/routers/hospital.js`)
const authRouter = require(`${global.__basedir}/modules/routers/auth.js`)

app.get('/', (req, res) => {
    res.status(200).type('text/html')

    res.sendFile(`public/html/${global.__user.type}/home.html`, {
        root: global.__basedir,
    })
})

app.use(express.static(`${global.__basedir}/public`))

app.use(donorRouter)
app.use(hospitalRouter)

app.get('/test', (req, res) => {
    res.status(200).type('text/html')

    res.sendFile(`public/html/${global.__user.type}/home.html`, {
        root: global.__basedir,
    })
})

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

app.use(authRouter)

app.use((req, res, next) => {
    res.sendStatus(404)
})

// Сервер ===================================================================

app.listen(mainOptions.server.port, mainOptions.server.host, () => {
    console.log(
        `Server listens http://${mainOptions.server.port}:${mainOptions.server.host}`
    )
})
