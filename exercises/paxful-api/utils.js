const queryString = require('query-string');
const API_CONFIG = require('./seller-config');
const CryptoJS = require("crypto-js");

exports.createPayload = (params = {}) => {
    params['apikey'] = API_CONFIG.API_KEY;
    params['nonce'] = new Date();
    params['apiseal'] = CryptoJS.HmacSHA256(queryString.stringify(params), API_CONFIG.API_SECRET);
    return params;
};

exports.setAdPrice = (params = {
    offer_hash: '2zE1NQbZAmb',
    margin: 100 + Math.random()*10
}) => {
    params['apikey'] = API_CONFIG.API_KEY;
    params['nonce'] = new Date();
    params['apiseal'] = CryptoJS.HmacSHA256(queryString.stringify(params), API_CONFIG.API_SECRET);
    return params;
};

exports.generateHeader = () => {
    return {
        "Content-Type": "text/plain",
        "Accept": " application/json; version=1"
    }
};