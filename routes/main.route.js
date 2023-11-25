let express = require("express");
let router = express.Router();

router.get('/getInfo', (req, res, next) => {
    const {TELEGRAM_TOKEN, SERVER_URL} = process.env
    const telegramApi = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`
    res.json("info");
});

module.exports = router