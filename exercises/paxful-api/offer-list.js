const Client = require('node-rest-client').Client;
const client = new Client();
const API_CONFIG = require('./seller-config');
const paxUtils = require('./utils');
const queryString = require('query-string');

client.post(`${API_CONFIG.PAX_API_URL}/offer/list`, {
        header: paxUtils.generateHeader(),
        data: queryString.stringify(paxUtils.createPayload())
    },
    (data) => console.log("offer/list", JSON.stringify(data))
);