const Client = require('node-rest-client').Client;
const client = new Client();
const API_CONFIG = require('./seller-config');
const paxUtils = require('./utils');
const queryString = require('query-string');


client.post(`${API_CONFIG.PAX_API_URL}/offer/update`, {
        header: paxUtils.generateHeader(),
        data: queryString.stringify(paxUtils.setAdPrice())
    },
    (data) => console.log("offer/update", data)
);