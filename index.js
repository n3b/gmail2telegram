require('babel-polyfill')

const listener    = require('./src/listener')
const htmlToText  = require('html-to-text')
const tg          = require('./src/telegram')

const prepareText = (str) => {
  const text = htmlToText.fromString(str, {ignoreHref: true, ignoreImage: true})
  return text.replace(/\n{2,}/g, "\n")
}

listener.on('message', (mail, seqno, atts) => {

  const subject = `${prepareText(mail.subject || '(No Subject)').substr(0, 256)}`
  const body    = `${prepareText(mail.html || mail.text || '(No Body)').substr(0, 3500)}`
  const text    = `${subject}\n${body}\n--------------------`

  tg.sendMessage(text)
})

listener.on('ready', () => console.log('ready'))
listener.on('close', () => listener.connect())
listener.connect()
