'use strict'

const Database = require(`${global.__basedir}/modules/database/index.js`)
const Mailer = require(`${global.__basedir}/modules/mailer/index.js`)

const interval = 60 * 60 * 100

const timerId = setInterval(checkBloodLevel, interval)

function checkBloodLevel() {
    if (!Database.isConnected) {
        clearInterval(timerId)
        return
    }

    const bloodReserves = Database.get('*', 'bloodCount')

    bloodReserves.forEach((bloodReserve) => {
        if (bloodReserve.count > bloodReserve.limit) {
            return
        }

        const donors = Database.get('email', 'donors', {
            bloodGroup: bloodReserve.bloodGroup,
        })

        donors.forEach((donor) => {
            Mailer.sendDonationRequest(donor.email, {
                component: bloodReserve.component,
                bloodGroup: bloodReserve.bloodGroup,
            })
        })
    })
}
