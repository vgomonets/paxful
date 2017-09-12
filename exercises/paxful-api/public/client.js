
var host = window.document.location.host.replace(/:.*/, '');
var socket = new WebSocket('ws://' + host + ':8888');

socket.onopen = function (event) {
    socket.send("next-command");
};

socket.onmessage = function (event) {
    console.log("socket, got message", event);
    if(event.data === 'openTab') {
        window.postMessage({
          direction: 'dispatcher',
          command: event.data
        }, "*");
    }
}

window.addEventListener("message", function (event) {
    console.log("client, got message", event);
    if (event.data.direction === 'page') {
        document.body.innerHTML = event.data.value;
      }
    }
  );
