var websocket,
  // serverip = "ws://localhost:7777",
  serverip = "ws://91.166.171.168:7777",
  hasUsername = false,
  serverAccess = false,
  username;

document.getElementById('save').addEventListener('click', createUsername);
document.getElementById('changeUsername').addEventListener('click', toggleChangeUsername);
document.getElementById('createRoom').addEventListener('click', sendNewRoom);
document.getElementById('getRooms').addEventListener('click', sendGetRooms);


try {
  //server access
  websocket = new WebSocket(serverip);
  websocket.onopen = function (e) {
    console.log('connected to ' + serverip);
    serverAccess = true;
    document.getElementById('disconnected').style.display = 'none';
    document.getElementById('connected').style.display = 'block';

    //username code
    var recoveredUsername = localStorage.getItem('username');
    if (isEmpty(recoveredUsername)) {
      console.log('no username created yet')
      document.getElementById('usernameInput').style.display = 'block'
      document.getElementById('app').style.display = 'none'
    } else {
      document.getElementById('usernameInput').style.display = 'none'
      document.getElementById('app').style.display = 'block'
      document.getElementById('usernameHello').innerText = 'hi ' + recoveredUsername

      username = recoveredUsername;
      hasUsername = true;
      if (serverAccess) var res = sendUsername(username);
    }
  }
} catch (error) {
  document.getElementById('disconnected').style.display = 'block';
  document.getElementById('connected').style.display = 'none';

  console.log("can't connect to server")
}




// websocket.onclose = function (e) {
//   writeToScreen("DISCONNECTED");
// };

websocket.onmessage = function (e) {
  console.log(e.data)
};

websocket.onerror = function (e) {
  console.log(e.data)
};



function isEmpty(string) {
  if (undefined == string || null == string || '' == string) return 1;
  else return 0;
}


function sendUsername(username) {
  send('setname|' + username);
}

function sendGetRooms() {
  var res = send('getrooms');
}

function sendNewRoom() {
  var res = send('newroom');
}



function createUsername() {
  username = document.getElementById('usernameText').value;
  localStorage.setItem('username', username);
  console.log('username : ' + username + ' saved!');
  sendUsername(username);
  window.location.reload(true);
}


function send(message) {
  websocket.send(message);
}


function toggleChangeUsername() {
  document.getElementById('usernameInput').style.display = 'block'
}