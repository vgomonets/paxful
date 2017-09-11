const Client = require('node-rest-client').Client;
const client = new Client();
const API_CONFIG = require('./seller-config');
const paxUtils = require('./utils');
const queryString = require('query-string');

const params =  {
    offer_type_field: 'sell',
    currency: 'USD',
    payment_method: 'bankwest-cash-deposit',
    margin: 100,
    range_min: 1,
    range_max: 1,
    payment_window: 50,
    offer_terms: 'test',
};

client.post(`${API_CONFIG.PAX_API_URL}/offer/create`, {
        header: paxUtils.generateHeader(),
        data: queryString.stringify(paxUtils.createPayload(params))
    },
    (data) => console.log("offer/create", data)
);