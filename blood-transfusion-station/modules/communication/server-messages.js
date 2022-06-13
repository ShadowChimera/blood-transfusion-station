class ServerMessages {
    static getTemplate(from, status = 'ok') {
        return {
            status: status,
            from: from,
            messages: [],
            res: null,
        }
    }
}

module.exports = ServerMessages
