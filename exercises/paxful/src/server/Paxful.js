const Client = require('node-rest-client').Client;
const queryString = require('query-string');
const CryptoJS = require("crypto-js");
const PAX_API_URL = 'https://paxful.com/api';

class Paxful {

    constructor(config) {
        this.config = config;
        this.client = new Client();
        this.PAX_API_URL = PAX_API_URL;
    }

    createPayload(params = {}) {
        params['apikey'] = this.config.API_KEY;
        params['nonce'] = new Date();
        params['apiseal'] = CryptoJS.HmacSHA256(queryString.stringify(params), this.config.API_SECRET);
        return params;
    };

    generateHeader() {
        return {
            "Content-Type": "text/plain",
            "Accept": " application/json; version=1"
        }
    };

    processResult(cb, chainCb) {
        return (result) => {
            if (result.status === "error") {
                cb.call(this, {error: JSON.stringify(result.error.message)})
            } else {
                chainCb.call(this, result.data);
            }
        };
    }

}


module.exports = Paxful;