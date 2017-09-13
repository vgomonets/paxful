$(function(){
      var data = {
        direction:'dispatcher',
        command: 'send-data',
        value: $("input#margin").val()
      };
      console.log("sending data", data);
      browser.runtime.sendMessage(data);
});
