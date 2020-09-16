function processMessage(message) {
    id = message.split('|')[0];
    content = message.split('|')[1];
    document.getElementById("console").innerHTML += "<br>id:" + id + "|content:" + content;

    switch (id) {
        case "newname":
            userId = content.split(',')[0]
            if (userId == myself) {
                localStorage.setItem('username', username);
                username = content.split(',')[1]
                document.getElementById('usernameHello').innerText = 'hi ' + username
                document.getElementById('usernameInput').style.display = 'none';
                sendGetRooms()
            }
            break;
        case "getmyid":
            myself = content;
            break;
        case "newroom":
            new Room(parseInt(content.split(',')[0]), content.split(',')[1]);
            DisplayRoomsAndUsers();
            break;
        case "userjoinroom":
            user = GetUserById(content.split(',')[0]);
            room = GetRoomById(parseInt(content.split(',')[1]));
            
            room.addUser(user);
            DisplayRoomsAndUsers();
            break;
        case "getrooms":
            ClearRooms();
            if (!isEmpty(content)) {
                usersNotInRoomString = content.split("#")[1];
                if (!isEmpty(usersNotInRoomString)) {
                    usersNotInRoom = usersNotInRoomString.split(',');
                    usersNotInRoom.forEach(function (userInfo, index) {
                        userid = userInfo.split(':')[0];
                        username = userInfo.split(':')[1];
                        new User(username, userid)
                    });
                }

                roomsString = content.split("#")[0];
                if (!isEmpty(roomsString)) {
                    rooms = roomsString.split('_');
                    rooms.forEach(function (room, index) {
                        roomid = room.split(',')[0];
                        roomname = room.split(',')[1];
                        var myNewRoom = new Room(roomid, roomname)

                        users = room.split(',')[2];
                        if (!isEmpty(users)) {
                            userinfos = users.split('&');
                            userinfos.forEach(function (user, index) {
                                userid = user.split(':')[0];
                                username = user.split(':')[1];
                                myNewRoom.addUser(new User(username, userid));
                            });
                        }
                    });
                }
            }
            DisplayRoomsAndUsers();
            break;
    }
}

function DisplayRoomsAndUsers() {
    content = document.getElementById("mainContent");
    content.innerHTML = "";
    Rooms.forEach(function (room, index) {
        var div1 = document.createElement("div");
        var text1 = document.createTextNode(room.name);
        var button1 = document.createElement("button");
        var textButton1 = document.createTextNode("Rejoindre");
        button1.onclick = function (event) {
            sendJoinRoom(room.id)
        }
        button1.appendChild(textButton1);
        div1.appendChild(text1);
        div1.appendChild(button1);
        content.appendChild(div1);
        room.users.forEach(function (user, index) {
            console.log(user);
            var div2 = document.createElement("div");
            var text2 = document.createTextNode(user.username);
            div2.appendChild(text2);
            div1.appendChild(div2);
        });
    });
}