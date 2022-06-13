'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

global.__basedir = __dirname;

// Модули ===================================================================

var express = require('express');
var expressHbs = require('express-handlebars');
expressHbs = require(global.__basedir + '/modules/hbs/helpers')(expressHbs);

var hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
app.engine('hbs', expressHbs.engine);

hbs.registerPartials(global.__basedir + '/views/partials');

// Парсеры ===================================================================

// ? парсер для данных application/x-www-form-urlencoded
// ? extended: true => support qs (nested objects: ...?nest[obj]=value => nest = {obj: 'value'})
var urlencodedParser = express.urlencoded({ extended: false });

// ? парсер для данных в формате json
var jsonParser = express.json();

// Переменные ===================================================================

var mainOptions = {
    server: {
        host: '127.0.0.1',
        port: 80
    }

    //  Маршрутизация ===================================================================

};app.get('/', function (req, res) {
    res.status(200).type('text/html');

    var options = getDefaultOptions('Главная');

    options.mainNav = {
        activeElement: '/'
    };

    res.render('home.hbs', options);
});

app.use(express.static(global.__basedir + '/public'));

app.get('/profile', function (req, res) {
    res.status(200).type('text/html');
    res.sendFile('public/html/donor/profile.html', { root: global.__basedir });
});

app.get(/\/(sign-up|registration)/, function (req, res) {
    res.status(200).type('text/html');

    var options = getDefaultOptions('Регистрация');

    options.mainNav = {
        activeNavElement: '/sign-up'
    };

    res.render('sign-up.hbs', options);
});

app.post(/\/(sign-up|registration)/, urlencodedParser, function (req, res) {
    var signUp = require(global.__basedir + '/api/auth/sign-up.js');
    signUp(req, res);
});

app.get(/\/(sign-in|authorization)/, function (req, res) {
    res.status(200).type('text/html');

    var options = getDefaultOptions('Вход');

    options.mainNav = {
        activeNavElement: '/sign-in'
    };

    res.render('sign-in.hbs', options);
});

app.use(function (req, res, next) {
    res.sendStatus(404);
});

// Функции ===================================================================

function getDefaultOptions(title) {
    var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var scripts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var defaultScriptOption = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'defer';

    var options = {
        head: {
            title: title,
            styles: [],
            scripts: []
        }
    };

    styles.forEach(function (style) {
        options.head.styles.push(style);
    });

    scripts.forEach(function (script) {
        if (script === null) {
            return;
        }

        if (Array.isArray(script)) {
            if (script.length === 2) {
                options.head.scripts.push({
                    options: script[0],
                    src: script[1]
                });
            } else {
                options.head.scripts.push({
                    option: defaultScriptOption,
                    src: script[0]
                });
            }

            return;
        }

        if ((typeof script === 'undefined' ? 'undefined' : _typeof(script)) === 'object') {
            options.head.scripts.push(script);
            return;
        }

        options.head.scripts.push({
            option: defaultScriptOption,
            src: script
        });
    });

    return options;
}

// Сервер ===================================================================

app.listen(mainOptions.server.port, mainOptions.server.host, function () {
    console.log('Server listens http://' + mainOptions.server.port + ':' + mainOptions.server.host);
});