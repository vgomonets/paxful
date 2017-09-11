const Client = require('node-rest-client').Client;
const client = new Client();
const API_CONFIG = require('./seller-config');
const paxUtils = require('./utils');
const queryString = require('query-string');

const params = {
    offer_hash: '2zE1NQbZAmb',
    // currency: 'USD',
    // payment_method: 'any-creditdebit-card',
    margin: '10010',
    // range_min: '1000',
    // range_max: '1000',
    // payment_window: '1000',
    // payment_method_label: '',
    // payment_method_group: 'debitcredit-cards',
    // offer_terms: 'test',
    // // trade_details: '1000',
    // // require_verified_email: 'false',
    // // require_verified_phone: 'false',
    // // require_min_past_trades: 'null',
    // // show_only_trusted_user: 'false',
    // // predefined_amount: 'null'
};

client.post(`${API_CONFIG.PAX_API_URL}/offer/update`, {
        header: paxUtils.generateHeader(),
        data: queryString.stringify(paxUtils.setAdPrice(params))
    },
    (data) => console.log("offer/update", data)
);