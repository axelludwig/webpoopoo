class User {
    constructor(username, id) {
        this.username = username;
        this.id = id;
        Users.push(this);
    }

    updateUsername(newusername) {
        this.username = newusername;
    }

    getRoom() {
        Rooms.forEach(function (room, index) {
            if (room.users.includes(this)) {
                return room;
            }
        });
        return null;
    }
}

function GetUserById(paramId) {
    res = null;
    console.log(Users.length);
    for (let i = 0; i < Users.length; i++) {
        user = Users[i];
        console.log(user.id + ":" + paramId)
        if (user.id == paramId) {
            
            res = user;
        }
    }
    console.log("null");
    return res;
}