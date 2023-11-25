const dotenv = require("dotenv") //setting environment variables s.a. secret key
const axios = require("axios")
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

dotenv.config()

const webhook_route = require('./routes/webhook.route');
const main_route = require('./routes/main.route');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

//routes
//app.use('/main', main_route);
app.use(`/webhook`, webhook_route);

const initTelegramWebhook = async () => {
    const {TELEGRAM_TOKEN, SERVER_URL} = process.env
    const telegramApi = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`
    const WEBHOOK_URL = SERVER_URL + `/webhook/telegram/${TELEGRAM_TOKEN}`
    const res = await axios.get(`${telegramApi}/setWebhook?url=${WEBHOOK_URL}`)
    //https://api.telegram.org/bot6915729746:AAGuNKPffXkVT2GP11kFn7hslD1udIC6aus/getUpdates
    console.log(res.data)
}

const port = process.env.PORT || 5000;
const server = app.listen(port, async () => {
    console.log('Connected to port ' + port)
    await initTelegramWebhook()
})

app.use((req, res, next) => {
    res.status(404).send('Error 404!')
});
