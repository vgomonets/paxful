const Client = require('node-rest-client').Client;
const client = new Client();
const API_CONFIG = require('./seller-config');
const paxUtils = require('./utils');
const queryString = require('query-string');

const listActiveTrades = () => {
    client.post(`${API_CONFIG.PAX_API_URL}/trade/list`, {
            header: paxUtils.generateHeader(),
            data: queryString.stringify(paxUtils.createPayload())
        },
        (data) => console.log("trade/list", data)
    );
};

listActiveTrades();


const offerPrice = () => {client.post(`${API_CONFIG.PAX_API_URL}/offer/list`, {
        header: paxUtils.generateHeader(),
        data: queryString.stringify(paxUtils.createPayload())
    },
    (data) => console.log("offer/list", JSON.stringify(data))
)};
offerPrice();

const params =  {
    username: 'testseller'
};
const userInfo = () => { client.post(`${API_CONFIG.PAX_API_URL}/user/info`, {
        header: paxUtils.generateHeader(),
        data: queryString.stringify(paxUtils.createPayload(params))
    },
    (data) => console.log("user/info", data)

)};

userInfo();