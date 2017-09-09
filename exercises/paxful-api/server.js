const Client = require('node-rest-client').Client;
const client = new Client();
const API_CONFIG = require('./seller-config');
const paxUtils = require('./utils');
const queryString = require('query-string');

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
