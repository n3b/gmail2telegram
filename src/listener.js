'use strict'

let imap
const config        = require('../config.json')
const Imap          = require('imap')
const googleapis    = require('googleapis')
const MailParser    = require("mailparser").MailParser
const EventEmitter  = require('events')

const { client_id, client_secret, access_token, refresh_token } = config.google
const google = new googleapis.auth.OAuth2(client_id, client_secret)
google.setCredentials({ access_token, refresh_token })

class Listener extends EventEmitter
{
  connect(debug = false) {

    if (!imap) {
      imap = new Imap({
        host:     'imap.gmail.com',
        port:     993,
        tls:      true,
        debug:    debug ? console.log : false
      })
      imap.on('ready', onReady)
      imap.on('close', onClose)
      imap.on('error', onError)
      imap.on('mail', onMail)
    }

    google.refreshAccessToken((err, tokens) => {
      if (err) {
        return onError(err)
      }
      const xoauth2data = [`user=${config.email}`, `auth=Bearer ${tokens.access_token}`, '', '']
      imap._config.xoauth2 = new Buffer(xoauth2data.join('\x01'), 'utf-8').toString('base64')
      imap.connect()
    })
  }
}

const listener = new Listener()

const onReady = () => {
  imap.openBox(config.mailbox, false, (err, mailbox) => {
    if (err) onError(err)
  })
  listener.emit('ready')
}

const onClose = () => {
  listener.emit('close')
}

const onError = (err) => {
  listener.emit('error', err)
}

const onMail = () => {
  imap.search(['UNSEEN'], (err, results = []) => {
    if (err) {
      return onError(err)
    }

    for (let id of results) {
      const f = imap.fetch(id, {
        bodies: '',
        markSeen: true
      })
      f.on('message', onMessage)
      f.on('error', onError)
    }
  })
}

const onMessage = (msg, seqno) => {
  const parser = new MailParser()
  let attributes = null

  parser.on('end', (mail) => {
    listener.emit('message', mail, seqno, attributes)
  });

  parser.on('attachment', (attachment) => {

  })

  msg.on('body', (stream, info) => {
    stream.pipe(parser)
  })

  msg.on('attributes', (attrs) => {
    attributes = attrs
  })
}

module.exports = listener
