'use strict'

const express = require('express')
let expressHbs = require('express-handlebars')
expressHbs = require(`${__dirname}/modules/hbs/helpers`)(expressHbs)

const hbs = require('hbs')

const app = express()

app.set('view engine', 'hbs')
app.engine('hbs', expressHbs.engine)

hbs.registerPartials(`${__dirname}/views/partials`)

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

//  Маршрутизация ===================================================================

app.get('/', (req, res) => {
    res.status(200).type('text/html')

    const options = getDefaultOptions('Главная')

    options.mainNav = {
        activeElement: '/',
    }

    res.render('home.hbs', options)
})

app.use(express.static(`${__dirname}/public`))

// app.get('/(sign-up|registration)', (req, res) => {
//     res.status(200).type('text/html')

//     const options = getDefaultOptions('Регистрация')

//     res.render('sign-up.hbs', options)
// })

// app.get('/(sign-in|authorization)', (req, res) => {
//     res.status(200).type('text/html')

//     const options = getDefaultOptions('Вход')

//     res.render('sign-in.hbs', options)
// })

app.use((req, res, next) => {
    res.sendStatus(404)
})

// Функции ===================================================================

function getDefaultOptions(
    title,
    styles = [],
    scripts = [],
    defaultScriptOption = 'defer'
) {
    const options = {
        head: {
            title: title,
            styles: [],
            scripts: [],
        },
    }

    styles.forEach((style) => {
        options.head.styles.push(style)
    })

    scripts.forEach((script) => {
        if (script === null) {
            return
        }

        if (Array.isArray(script)) {
            if (script.length === 2) {
                options.head.scripts.push({
                    options: script[0],
                    src: script[1],
                })
            } else {
                options.head.scripts.push({
                    option: defaultScriptOption,
                    src: script[0],
                })
            }

            return
        }

        if (typeof script === 'object') {
            options.head.scripts.push(script)
            return
        }

        options.head.scripts.push({
            option: defaultScriptOption,
            src: script,
        })
    })

    return options
}

// Сервер ===================================================================

app.listen(mainOptions.server.port, mainOptions.server.host, () => {
    console.log(
        `Server listens http://${mainOptions.server.port}:${mainOptions.server.host}`
    )
})
