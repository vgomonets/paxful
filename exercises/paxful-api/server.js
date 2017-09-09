var Client = require('node-rest-client').Client;
var client = new Client();
var CryptoJS = require("crypto-js");

const queryString = require('query-string')

client.get("https://paxful.com/buy-bitcoin/cash-deposit/USD?format=json", function (data) {
    console.log("cash-deposit:", data);
});


client.post("https://paxful.com/api/payment-method/list", {
    headers: {
        "Content-Type": "text/plain",
        "Accept": " application/json; verion=1"
    }
}, function (data) {
    console.log("payment-method:", data);
});

const API_SECRET = 'EC5TAvsXSQyEtkj11N9r_afF-oXwGlPI';
const API_KEY = 'mzqqFZyQA4CaEb1g-gNHIp5sObS55rsO';

var payload = {
    apikey: API_KEY,
    nonce: new Date()
};

payload['apiseal'] = CryptoJS.HmacSHA256(queryString.stringify(payload), API_SECRET);

client.post("https://paxful.com/api/wallet/balance", {
    headers: {
        "Content-Type": "text/plain",
        "Accept": " application/json; version=1"
    },
    data: queryString.stringify(payload)
}, function (data) {
    console.log("wallet/balance", data);
});
