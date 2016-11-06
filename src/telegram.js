const querystring = require('querystring')
const https       = require('https')
const config      = require('../config.json')
const url         = `/bot${config.telegram.bot_token}/sendMessage`

module.exports = {
  sendMessage: (text) => {
    const data = querystring.stringify({
      chat_id: config.telegram.chat_id,
      text:    text
    })

    const options = {
      hostname: 'api.telegram.org',
      port:     443,
      path:     url,
      method:   'POST',
      headers: {
        'Content-Type':   'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    }

    const post = https.request(options, (res) => {
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        const data = JSON.parse(chunk)
        if (!data) {
          return console.error('Could not parse Telegram response')
        }
        if (!data.ok) {
          console.error(`${data.error_code} ${data.description}`)
        }
      })
    })
    post.write(data)
    post.end()
  }
}