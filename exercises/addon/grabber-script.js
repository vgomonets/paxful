$(function(){
      var data = {
        direction:'dispatcher',
        command: 'send-data',
        value: $("a:contains('More information...')").attr('href')
      };
      console.log("sending data", data);
      browser.runtime.sendMessage(data);
});
