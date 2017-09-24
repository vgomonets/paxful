import 'babel-polyfill';
import 'webextension-polyfill';
import $ from 'jquery';

browser.runtime.onMessage.addListener((event) => {
    console.log("content, got message", event);
    switch (event.command) {
        case 'modify-price':
            $(() => {
                $("#margin").val(event.value.price);
                $('#save-btn').click();
                browser.runtime.sendMessage({
                    direction: 'dispatcher',
                    command: 'update-succeed',
                    tabId: event.tabId,
                    value: event.value
                });
            });
            break;
    }
});
