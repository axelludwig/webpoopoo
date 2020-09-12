var ws = new WebSocket('ws://91.166.171.168:9050', 'a')

ws.onopen = function() {
  console.log("ok")
};