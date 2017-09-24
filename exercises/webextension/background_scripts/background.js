import 'babel-polyfill';
import 'webextension-polyfill';

const modifyPrice = async (data) => {
    let tab = await browser.tabs.create({
        url: `https://paxful.com/offer-manager/edit/${data.value.hash}`
    });
    setTimeout(() => browser.tabs.sendMessage(tab.id, {
            command: 'modify-price',
            value: data.value,
            tabId: tab.id
        }
    ), 5000);

};

const notifyMainPage = async (data) => {
    await browser.tabs.remove(data.tabId);
    let tabs = await browser.tabs.query({url: 'localhost:8888'});
    Array.from(tabs, tab => browser.tabs.sendMessage(tab.id, {
            direction: "server",
            command: 'price-is-modified'
        }
    ));
};

const wait = (data) => {
    setTimeout(() => {
        browser.tabs.sendMessage(data.tabId, {
                command: 'check-status',
                tabId: data.tabId,
                value: data.value
            }
        )
    }, 5000);
};

browser.runtime.onMessage.addListener((event) => {
    console.log("background, got message", event);
    if (event.direction === 'dispatcher') {
        switch (event.command) {
            case 'modify-price':
                // noinspection JSIgnoredPromiseFromCall
                modifyPrice(event);
                break;
            case 'wait-for-success':
                wait(event);
                break;
            case 'update-succeed':
                // noinspection JSIgnoredPromiseFromCall
                notifyMainPage(event);
                break;
            default:
        }
    }

});
