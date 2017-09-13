$(function(){
      var data = {
        direction:'dispatcher',
        command: 'send-data',
        value: $("a:contains('EDIT')").attr('href')
      };
      console.log("sending data", data);
      browser.runtime.sendMessage(data);
});
