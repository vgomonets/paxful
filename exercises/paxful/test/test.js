const assert = require('assert');
const API_SECRET = 'EC5TAvsXSQyEtkj11N9r_afF-oXwGlPI';
const API_KEY = 'mzqqFZyQA4CaEb1g-gNHIp5sObS55rsO';
const Paxful = require('../src/server/Paxful');
const PaxfulAd = require('../src/server/PaxfulAd');

const getRandom = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
};

describe('Paxful API', () => {

    const config = {
        pricer: {
            timeout: 180000  //ms
        },

        API_SECRET,
        API_KEY,

        myTraderId: 'testseller',

        paymentMethods: {
            buy: {
                cashDeposit: {
                    url: 'buy-bitcoin/cash-deposit-to-bank'
                },
                creditCard: {
                    url: 'buy-bitcoin/any-creditdebit-card'
                }
            }
        },

        onlineStatusPattern: /regex/
    };

    const px = new Paxful(config);
    const pxad = new PaxfulAd(px, 'wjWmDWN8Po5');

    describe('offerPrice() - get/set the price of one of our ads', () => {

        it('should update offer price', (done) => {

            const expectedPrice = getRandom(11231, 12231);

            pxad.offerPrice(expectedPrice, ({error}) => {
                if (error) {
                    done(error);
                } else {
                    pxad.offerPrice(false, ({result: {price}}) => {
                        const delta = Math.abs(price - expectedPrice) / Math.max(price, expectedPrice) * 100;
                        assert.ok(delta < 0.01);//delta should be less than 0.01%
                        done();
                    })
                }
            });

        }).timeout(5000);

    });
});