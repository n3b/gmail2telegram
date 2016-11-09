##Install

```
git clone https://github.com/n3b/gmail2telegram 
cd gmail2telegram
npm install
```

##Configure

1. [Obtain Google APIs tokens](docs/google.md)
2. Obtain Telegram Bot credentials:
    * [Create Telegram Bot](https://core.telegram.org/bots#6-botfather)
    * Start a chat with your new bot
    * Get chat ID at `https://api.telegram.org/bot{YourBotToken}/getUpdates`
3. Copy `config.dist.json` to `config.json` and replace the values there 
4. `npm start`

(Optional) use [process manager](http://pm2.keymetrics.io/) to keep app process alive
