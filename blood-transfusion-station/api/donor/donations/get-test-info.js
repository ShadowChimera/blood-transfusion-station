'use strict'

const ServerMessages = require(`${global.__basedir}/modules/communication/server-messages.js`)

const testInfo = {
    express: {
        header: ['Показник', 'Результат', 'Норма', 'Одиниця виміру'],
        data: [
            ['Гемоглобін (HGB)', '132', '110-165', 'г/л'],
            ["Кров'яний тиск", '160/86', '100/60-180/100', 'мм рт. ст.'],
            ['Пульс', '132', '50-100', 'у/хв'],
        ],
    },
    lab: {
        header: ['Показник', 'Результат', 'Норма', 'Одиниця виміру'],
        data: [
            ['Лейкоцити (WBC)', '4.4', '4.4-11.3', '10<sup>9</sup>/л'],
            ['Еритроцити (RBC)', '4.15', '3.9-5.10', '10<sup>12</sup>/л'],
            [
                'Середній вміст гемоглобіну в еритроциті (MCH)',
                '31.8',
                '25.2-34.7',
                'пг',
            ],
            ['Гематокріт (HCT)', '40.5', '30.2-45.0', '%'],
            ['Середній обсяг еритроциту (MCV)', '97.6', '78.6-102.2', 'fl'],
            ['Гемоглобін (HGB)', '132', '110-165', 'г/л'],
            [
                'Середня концентрація гемоглобіну в еритроциті (MCHC)',
                '32.6',
                '30.0-38.0',
                'г/дл',
            ],
            ['Тромбоцити (PLT)', '304', '128-434', '10<sup>9</sup>/л'],
        ],
    },
    viruses: [],
}

function getTestInfo(req, res) {
    const response = ServerMessages.getTemplate(
        'api/donor/donations/get-test-info'
    )

    console.log(req.body.testId)

    response.result = testInfo

    res.status(200).json(response)
}

module.exports = getTestInfo
