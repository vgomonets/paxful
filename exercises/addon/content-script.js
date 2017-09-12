window.addEventListener("message", function (event) {
    console.log("content, got message", event);
    browser.runtime.sendMessage(event.data);

});

browser.runtime.onMessage.addListener(function (event)  {
  console.log("content, got message", event);
  window.postMessage({
    direction: 'page',
    value: event.message
  }, "*");
});
