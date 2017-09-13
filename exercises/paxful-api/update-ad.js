const Client = require('node-rest-client').Client;
const client = new Client();
const API_CONFIG = require('./seller-config');
const paxUtils = require('./utils');
const queryString = require('query-string');


const setAdPrice = (offer_hash, margin) => {
    client.post(`${API_CONFIG.PAX_API_URL}/offer/update`, {
            header: paxUtils.generateHeader(),
            data: queryString.stringify(paxUtils.createPayload({offer_hash, margin}))
        },
        (data) => console.log("offer/update", data)
    );
}

//test function
setAdPrice('AgqeBpZnnmX', 100 + Math.random()*10);
