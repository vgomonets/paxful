const queryString = require('query-string');

class PaxfulAd {

    constructor(px, adId) {
        this.px = px;
        this.adId = adId;
    }

    offerPrice(price, cb) {
        //get offer details
        this.px.client.post(`${this.px.PAX_API_URL}/offer/list`, {
                header: this.px.generateHeader(),
                data: queryString.stringify(this.px.createPayload({offer_hash: this.adId}))
            }, this.px.processResult(cb, (result) => {
                let {fiat_USD_price_per_btc, margin} = result.offers.find(offer => offer.offer_hash === this.adId);
                if (!price) {
                    cb.call(this, {
                        result: {
                            margin,
                            price: fiat_USD_price_per_btc
                        }
                    });
                } else {
                    const normalizedPrice = fiat_USD_price_per_btc / (1 + margin / 100);

                    margin = (price / normalizedPrice - 1) * 100;

                    this.px.client.post(`${this.px.PAX_API_URL}/offer/update`, {
                            header: this.px.generateHeader(),
                            data: queryString.stringify(this.px.createPayload({offer_hash: this.adId, margin}))
                        }, this.px.processResult(cb, () => {
                            cb.call(this, {
                                result: {
                                    margin,
                                    price
                                }
                            });
                        })
                    );

                }
            })
        );
    }
}

module.exports = PaxfulAd;