const { Client } = require('discord.js')
const { token, type, channel } = require('./config')

class Xusu extends Client {
    constructor(...args) {
        super(...args)

        this.chat = require('node-fetch')
        this.type = type
        this.sessions = new Map()
    }

    auth() {
        super.login(token)
        this.on('ready', () => {
            console.log(`Бот "${type}" готов, авторизован в ${this.user.tag}`)
            this.generateInvite().then(console.log)

            this.channel = this.channels.cache.get(channel)
        });
    }
}


module.exports = Xusu;