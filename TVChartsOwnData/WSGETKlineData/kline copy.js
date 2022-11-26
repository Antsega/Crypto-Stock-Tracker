const log = console.log;

const api = require('binance');
const express = require('express');
const path = require('path')
const socket = require('socket.io');
const app = express();
const port = process.env.PORT || 4000;

const server = app.listen(port,() => log(`Kline Data Server started on port 4000`));
const io = socket(server);

const bRest = new api.BinanceRest({
        key: "", // Get this from your account on binance.com
        secret: "", // Same for this
        timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
        recvWindow: 20000, // Optional, defaults to 5000, increase if you're getting timestamp errors
        disableBeautification: false,
        handleDrift: true
});
const binanceWS = new api.BinanceWS(true);
const bws = binanceWS.onKline('BTCUSDT', '1m', (data) => {
    io.sockets.emit('KLINE',{time:Math.round(data.kline.startTime/1000),open:parseFloat(data.kline.open),high:parseFloat(data.kline.high),low:parseFloat(data.kline.low),close:parseFloat(data.kline.close)});
});

app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.get('/', function(req,res) {
    res.render('index')
})