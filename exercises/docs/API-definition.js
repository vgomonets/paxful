
require('paxful');

var config = {
	pricer: {
		timeout: 180000  //ms
	},
	
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
	
	onlineStatusPattern: /regex/  // this should match the text like 'Seen 1 min ago' and produce a Match only for "green" users
};

var px = new Paxful(config);

// NOTE: every function below is asyncronous and the last argument 'cb' is a function with signature
// function cb (error, result) - error is set if there was a problem, result is set if all or partial result could be obtained
// the called function's return value is the result


////////////////////////////////////////////////////////////////////////////////
// getWalletBalance() - get wallet balance (amount of bitcoin in the account)
px.getWalletBalance(
	cb		// callback function to pass the result structure { error: "string or null", result: 12.344567 }
	);


////////////////////////////////////////////////////////////////////////////////
// getAds() - get competing ads list in a category (usually category == payment method)
// example page:  https://paxful.com/buy-bitcoin/cash-deposit-to-bank/USD#content
// So, this is  https://paxful.com/<config.paymentMethods.cashDeposit.url>/USD#content
// returns ads array - see below
px.getAds(
	method, 	// required: eg. paymentMethods.buy.cashDeposit,
	maxCount, 	// optional: eg. 10 - want only the top 10 ads from the page, default = all
	currency, 	// optional: default "USD",
	cb
	);
	
// returns array of structures:
ads = [
	{
		position: 1, // zero-based index of the ad's position in the list on Paxful page
		isUserOnline: true,  // true/false: if config.onlineStatusPattern matches onlineStatusText
		onlineStatus: 'string', // 'green', 'yellow', 'gray'  - for example, in Paxful CSS green class is 'seen-very-recently'
		onlineStatusText: "string", // scraped text like 'seen 1 hour ago', 'seen just now',
		paymentMethod: "string", // scraped text like "Bank of America Online Transfer" or "US Bank cash deposit"
		paymentDetails: "string", // sellers provide details in this string, for cash deposit usually this is  the bank name like "BOA" or "CHASE"
		tags: [ "array of strings" ], // those blue tags like 'no id needed', 'cash only', 'online payments', etc.
		username: "string", // username of the seller
		country: "string", // two-letter country code (you will find it in 'class' attribute of the flag icon, like 'US', 'RU')
		currency: "string", // this should normally be USD because we set /USD in the url - but whatever the ad shows, put it here
		reputation: 123, // reputation score of the user
		price: 4123.56, // rate per bitcoin
		limits: [ 100, 1000 ], // array of [min, max] USD limits 
	},
	//... 
];
	
////////////////////////////////////////////////////////////////////////////////
// new PaxfulAd() - PaxfulAd constructor, represents each of my own ads
pxad = new PaxfulAd(
	px,   		// instance of Paxful
	adId);		// e.g. 'wjWmDWN8Po5' - this can only be ID of my own ad
	
////////////////////////////////////////////////////////////////////////////////
// offerPrice() - get/set the price of one of our ads
// returns the price and the markup  { price, markup }
pxad.offerPrice(
	price,		// optional: e.g. 4123.45, default: get the current price and markup, don't change it
				// yes, I know that Paxful takes percetages, but the API is going to take price only.
				// it is the job of the implementation to convert this price argument into whatever Paxful needs to set this price
				// to do this, set "0" Price markup and scrape the "Offer price" value USD / BTC 
				// then compute percentage that needs to be set to make Offer price equal the price passed in
	cb
	);


////////////////////////////////////////////////////////////////////////////////
// enabled() - turn the ad ON or OFF, or get its current status
// returns true/false whether the ad is ON or OFF
pxad.enabled(
	isOn,		// optional: true to enable, false to disable, default: do not change status, just return the current status
	cb
	);
	
	
////////////////////////////////////////////////////////////////////////////////
// limits() - get/set USD limits
// returns array [min, max] of USD limits
pxad.limits(
	limits,		// optional: array of two values for min and max USD limit, default: do not change limits, just return the current limits
	cb
	);
	


////////////////////////////////////////////////////////////////////////////////
// getActiveTrades() - return a list of active trades
px.getActiveTrades(
	cb
	);
	

////////////////////////////////////////////////////////////////////////////////
// getClosedTrades() - return a list of past closed trades
px.getClosedTrades(
	maxCount, 		// optional: (default=50) to process a maximum of maxCount most recent trades from the closed trade history
	maxHoursAgo, 	// optional: (default=24) to process only the trades that were created less than maxHoursAgo
	cb
	);
	
// both getActiveTrades and getClosedTrades return array:
result = [
	{
		// for now, this is the structure of the 'trade' object from Paxful API
	},
	// ...
];
	

	
	
////////////////////////////////////////////////////////////////////////////////
// new PaxfulTrade() - PaxfulTrade constructor, represents each trade between me and other traders
pxtx = new PaxfulTrade(
	px,   		// instance of Paxful
	tradeId		// e.g. 'AGmEWnB7geV' - hash id of an existing trade (currently active or already closed or canceled)
	);

	
////////////////////////////////////////////////////////////////////////////////
// getUserInfo() - get details about the user of the trade
// returns a structure of user info - see below
pxtx.getUserInfo(
	cb
	);
	
// returns a userInfo structure
var userInfo = {
	userId: "string", // username
	profileUrl: "string", // URL of the user profile
	trusted: true/false, // if I marked this user as trusted in the past
	tradeCount: 12, // number of successful completed trades this user has had with me in the past
	partnerCount: 333, // total number of trading partners this user has traded with
	feedbackScore: 97.5, // feedback score of the user converted to percentage: for example +333/-22  converts to 93.8 = 333 / (333 + 222) * 100
	firstPurchaseDate: Date, // date of the first transaction of the user
	accountCreationDate: Date, // date of the account creation of the user
	lastOnlineDate: Date, // date when the user was last online
	
	securityChecks: {
		email: {
			isGood: true/false, // true if email was verified
			msg: "string", // any comment shown about email verification
		},
		phone: {
			isGood: true/false, // true if phone was verified
			country: "string",  // country of the phone
			msg: "string", // any comment shown about phone verification
		},
		age: {
			isGood: true/false, // true if age of the account is good
			msg: "string", // any comment shown about age of the account
		},
		history: {
			isGood: true/false, // true if the user has any history of trades on Paxful
			msg: "string", // any comment shown about trading history of the user
		},
		ip: {
			isGood: true/false, // true if IP was verified
			country: "string",  // country of the IP
			msg: "string", // any comment shown about IP verification
		},
		realName: {
			isGood: true/false, // true if name was verified by Paxful
			name: "string",  // user's full real name
			msg: "string", // any comment shown about name verification
		}
	}
};
	
	
	
////////////////////////////////////////////////////////////////////////////////
// getMessages() - get chat messages for this trade
// returns an array of messages 
pxtx.getMessages(
	cb
	);
	
// returns array:  (see Paxful API trade-chat/get)
// note: this structure may look differntly
// need to investigate how to retrieve attachments/images 
result = [
	{
		"id": "string", // unique message ID or hash
		"text": "Hi",
		"timestamp": 12345678,
		"type": "msg",
		"user_id": 1001
	},
	// ...
];
	

	
////////////////////////////////////////////////////////////////////////////////
// downloadAttachment() - get chat messages for this trade
// downloads and saves the attachments that came with message identified by msgId to a file on local disk 
// returns result: true if successful, otherwise result: false and error: error string
pxtx.downloadAttachment(
	msgId,  // unique message ID (see above)
	relativePath, // path like 'attachments/images/foobar.jpg' relative to where nodejs server is running	
	cb
	);
	

////////////////////////////////////////////////////////////////////////////////
// sendMessage() - send a message to the trade's chat, optionally with an attachment
// send a message to the trade chat. If relativePath is provided, also send the file as chat upload
// returns result: true if successful, otherwise result: false and error: error string
pxtx.sendMessage(
	message,  		// required: message text
	relativePath, 	// optional: path like 'attachments/images/foobar.jpg' relative to where nodejs server is running	
	cb
	);


////////////////////////////////////////////////////////////////////////////////
// leaveUserFeedback() - leave a maximally positive feedback (top-score, trusted, etc.) for the user
// returns result: true if successful, otherwise result: false and error: error string	
pxtx.leaveUserFeedback(
	cb
	);

	
////////////////////////////////////////////////////////////////////////////////
// releaseEscrow() - release bitcoins held in escrow of this trade to the buyer
// returns result: true if successful, otherwise result: false and error: error string	
pxtx.releaseEscrow(
	securityCode, 		// if paxful API requires a different set of credentials to release coins, provide it here
						// this can be a pin-code, a password or a structure of API OAuth keys, Bearer tokens etc.
	cb
	);

	
	
	
	