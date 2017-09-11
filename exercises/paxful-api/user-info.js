const Client = require('node-rest-client').Client;
const client = new Client();
const API_CONFIG = require('./seller-config');
const paxUtils = require('./utils');
const queryString = require('query-string');

const params =  {
    username: 'testseller'
};

client.post(`${API_CONFIG.PAX_API_URL}/user/info`, {
        header: paxUtils.generateHeader(),
        data: queryString.stringify(paxUtils.createPayload(params))
    },
    (data) => console.log("user/info", data)
);