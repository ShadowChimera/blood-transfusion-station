'use strict'

const Database = require(`${global.__basedir}/modules/database/index.js`)
const Mailer = require(`${global.__basedir}/modules/mailer/index.js`)

const interval = 60 * 60 * 100

const timerId = setInterval(checkRestrictions, interval)

function checkRestrictions() {
    if (!Database.isConnected) {
        clearInterval(timerId)
        return
    }

    const now = new Date()
    const donors = Database.get('*', 'donors')

    donors.forEach((donor) => {
        const restrictions = JSON.parse(donor.restrictions)

        const updatedRestrictions = restrictions.map((restriction) => {
            const restrictionEndTime = new Date(restriction.endTime)
            if (+restrictionEndTime > +now) {
                return restriction
            }
        })

        if (updatedRestrictions.length === 0) {
            Mailer.sendRestrictionInfo(donor.email)
        }

        Database.update(
            'donors',
            {
                restrictions: JSON.stringify(updatedRestrictions),
            },
            {
                id: donor.id,
            }
        )
    })
}
