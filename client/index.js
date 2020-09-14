/*var socket = new WebSocket("http://localhost:9050");

socket.onopen = function() {
  console.log("ok")
};*/

/*
 var sock = new SockJS('http://127.0.0.1:9050');
 
 sock.onopen = function() {
     console.log('open');
     sock.send('test');
 };*/
 
 console.log("sida")
 
const socket = io('ws://127.0.0.1:9050');

socket.onopen = function() {
  websocket.send("super");
};