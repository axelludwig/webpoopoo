var websocket,
    serverip = "ws://localhost:7777",
    // serverip = "ws://91.166.171.168:7777",
    hasUsername = false,
    serverAccess = false,
    username,
    myself;

var Rooms = []
var Users = []


document.getElementById('save').addEventListener('click', createUserButton);
document.getElementById('changeUsername').addEventListener('click', toggleChangeUsername);
document.getElementById('createRoom').addEventListener('click', sendNewRoom);


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

            username = recoveredUsername;
            hasUsername = true;
            if (serverAccess) var res = sendUsername(username);
        }
    }
} catch (error) {
    document.getElementById('disconnected').style.display = 'block';
    document.getElementById('connected').style.display = 'none';
    console.log("can't connect to the server")
}




websocket.onclose = function (e) {
    document.getElementById('disconnected').style.display = 'block';
    document.getElementById('connected').style.display = 'none';
    console.log("disconnected from the server")
};

websocket.onmessage = function (e) {
    if (e.data)
        processMessage(e.data);
};

websocket.onerror = function (e) {
    console.log(e.data)
};



function isEmpty(string) {
    if (undefined == string || null == string || '' == string) return 1;
    else return 0;
}

//Mettre toutes les fonctions d'envoi dans un fichier à part

function sendUsername(username) {
    send('setname|' + username);
}

function sendGetRooms() {
    var res = send('getrooms');
}

function sendNewRoom() {
    var res = send('newroom');
}

function sendJoinRoom(id){
    send('joinroom|' + id)
}

function createUserButton() {
    username = document.getElementById('usernameText').value;
    sendUsername(username);
}


function send(message) {
    websocket.send(message);
}


function toggleChangeUsername() {
    document.getElementById('usernameInput').style.display = 'block'
}

function ClearRooms() {
    Rooms = []
    Users = []
}