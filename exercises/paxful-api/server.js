const Client = require('node-rest-client').Client;
const client = new Client();
const API_CONFIG = require('./seller-config');
const paxUtils = require('./utils');
const queryString = require('query-string');

var WebSocketServer = require('ws').Server;
var path = require('path');
var express = require('express');
var server = require('http').createServer();
var app = express();




app.use(express.static(path.join(__dirname, '/public')));

var wss = new WebSocketServer({server: server});

wss.on('connection', function (ws) {
    console.log('connection');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        if(message == 'next-command') {
            ws.send("openTab");
        }
    });

    ws.on('close', function () {
        console.log('stopping');
    });
});

server.on('request', app);

app.get('/openTab', function (req, res, next) {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Open Page</title>
        <script type="text/javascript" src="client.js"></script>
    </head>
    <body>
    </body>
    </html>`);
});

server.listen(8888, function () {
    console.log('Listening on http://localhost:8888');
});

client.get("https://paxful.com/buy-bitcoin/cash-deposit/USD?format=json", function (data) {
    console.log("cash-deposit:", data);
});


client.post("https://paxful.com/api/payment-method/list", {
    header: paxUtils.generateHeader()
}, (data) => console.log("payment-method/list", data));

client.post(`${API_CONFIG.PAX_API_URL}/wallet/balance`, {
        header: paxUtils.generateHeader(),
        data: queryString.stringify(paxUtils.createPayload())
    },
    (data) => console.log("wallet/balance", data)
);
