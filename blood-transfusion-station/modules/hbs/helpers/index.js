const handlebars = require('hbs')

function hbsHelpers(hbs) {
    return hbs.create({
        helpers: {
            getNavElement,
        },
        layoutsDir: 'views/layouts',
        defaultLayout: 'layout',
        extname: 'hbs',
    })
}

module.exports = hbsHelpers

function getNavElement(link, text, activeElement) {
    let active = ''

    if (link === activeElement) {
        active = 'active'
        link = '#'
    }

    const element = `
        <li class="list-item">
            <a href="${link}" class="link ${active}">${text}</a>
        </li>
    `

    return new handlebars.SafeString(element)
}
