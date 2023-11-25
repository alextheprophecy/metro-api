const axios = require("axios");
const {scrapeMessage} = require("./dictionary")
const sendTelegramMessage = (text) =>{
    const telegramApi = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`
    const msgFinn = false;

    if(msgFinn) {
        return axios.post(`${telegramApi}/sendMessage`, {
            chat_id: 999242019, //finn
            text: ("Message: \n " + text)
        }).then(
            axios.post(`${telegramApi}/sendMessage`, {
                    chat_id: 1931699758, //me
                    text: ("Message: \n " + text)
                }
            ))
    }else{
        return axios.post(`${telegramApi}/sendMessage`, {
            chat_id: 1931699758, //me
            text: ("Message: \n " + text)
        })
    }
}

const readTelegramMsg = (text, date, chatId) =>{
    const [dep, dest] = scrapeMessage(text)
    const result = `${dep}->${dest}`

    if(dep !== "" && dest !== "")sendTelegramMessage(result)
}

module.exports = {
    readTelegramMsg,
    sendTelegramMessage
}