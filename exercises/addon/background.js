browser.runtime.onMessage.addListener(function (event) {
    console.log("background, got message", event);
    if (event.direction === 'dispatcher') {
      switch (event.command) {
        case 'openTab':
            browser.tabs.create({
                url:"https://paxful.com/offer-manager/edit/AgqeBpZnnmX"
            });
          break;
        case 'send-data':
            browser.tabs.query({
              currentWindow: true
            }).then(function(tabs){
              for (let tab of tabs) {
                browser.tabs.sendMessage(
                  tab.id,
                  {
                    direction: "page",
                    message: event.value
                  }
                );
             }
            });
        break;
        default:
      }
    }

});
