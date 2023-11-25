let express = require("express");
const axios = require("axios");
let router = express.Router();
const {readTelegramMsg, sendTelegramMessage} = require("../controllers/dataController")

//webhook
router.post(`/telegram/${process.env.TELEGRAM_TOKEN}`, (req, res, next) => {
    console.log(req.body)
    try {
        const chatId = req.body.message.chat.id
        const date = req.body.message.date
        const text = req.body.message.text

        readTelegramMsg(text, date, chatId)
        res.send()

        //-4038875919//-4011736835)

    }catch(e) {res.send()}
});

module.exports = router