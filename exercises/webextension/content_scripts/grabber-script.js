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
                    command: 'wait-for-success',
                    direction: 'dispatcher',
                    tabId: event.tabId,
                    value: event.value.hash
                });
            });
            break;
        case 'check-status' :
            $(() => {
                const message = $('.style-msg.successmsg');
                const html = message.html();
                if (html && html.indexOf(event.value) !== -1) {
                    browser.runtime.sendMessage({
                        direction: 'dispatcher',
                        command: 'update-succeed',
                        tabId: event.tabId,
                        value: event.value
                    });
                } else {
                    alert("wait-for-success");
                    browser.runtime.sendMessage({
                        direction: 'dispatcher',
                        command: 'wait-for-success',
                        tabId: event.tabId,
                        value: event.value
                    });
                }
            });
            break;
    }
});
