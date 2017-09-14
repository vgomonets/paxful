import $ from 'jquery';

browser.runtime.onMessage.addListener((event) => {
    console.log("content, got message", event);
    switch (event.command) {
        case 'modify-price':
            $(() => {
                $("#margin").val(event.value.price);
                $('#save-btn').submit();
                browser.runtime.sendMessage({
                    command: 'wait-for-success',
                    tabId: event.tabId,
                    value: event.value.hash
                });
            });
            break;
        case 'check-status' :
            $(() => {
                const message = $('.style-msg.successmsg');
                if (message.length && message.html().indexOf(event.value) !== -1) {
                    browser.runtime.sendMessage({
                        command: 'update-succeed'
                    });
                } else {
                    browser.runtime.sendMessage({
                        command: 'wait-for-success',
                        tabId: event.tabId,
                        value: event.value
                    });
                }
            });
            break;
    }
});
