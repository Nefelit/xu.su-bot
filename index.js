const Xusu = require('./xusu')
const xusu = new Xusu()

//# Simple code

xusu.on('message', async message => {
    if (message.author.bot) return; // Disallow bots & allows DM messages

    if (message.channel.id !== xusu.channel.id && !message.mentions.users.has(xusu.user.id) && message.channel.type !== 'dm') return;

    let pattern = `<!?${xusu.user.id}>`
    pattern = new RegExp(pattern)

    if (message.mentions.users.has(xusu.user.id)) message.content = message.content.replace(pattern, '')

    const configuration = {
        bot: xusu.type,
        text: message.content,
        uid: xusu.sessions.get(message.author.id)
    }
    xusu.chat('http://xu.su/api/send', {
        body: JSON.stringify(configuration),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors'
    }).then(response => response.json()).then(response => {
        message.channel.send(response.text)
        if (!xusu.sessions.get(message.author.id)) xusu.sessions.set(message.author.id, response.uid)
    })

})

xusu.auth()