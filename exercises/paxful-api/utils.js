const queryString = require('query-string');
const API_CONFIG = require('./seller-config');
const CryptoJS = require("crypto-js");

exports.createPayload = (params = {}) => {
    params['apikey'] = API_CONFIG.API_KEY;
    params['nonce'] = new Date();
    params['apiseal'] = CryptoJS.HmacSHA256(queryString.stringify(params), API_CONFIG.API_SECRET);
    return params;
};

exports.setAdPrice = (params = {}) => {
    params['apikey'] = API_CONFIG.API_KEY;
    params['nonce'] = new Date();
    params['apiseal'] = CryptoJS.HmacSHA256(queryString.stringify(params), API_CONFIG.API_SECRET);
    params['id'] = '135333';
    params['margin'] = '1000';
    return params;
};

exports.generateHeader = () => {
    return {
        "Content-Type": "text/plain",
        "Accept": " application/json; version=1"
    }
};