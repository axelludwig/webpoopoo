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
        res = null;
        for (let i = 0; i < Rooms.length; i++) {
            room = Rooms[i];
            if (room.users.includes(this)) {
                res = room;
            }
        }
        return res;
    }
}

function GetUserById(paramId) {
    res = null;
    for (let i = 0; i < Users.length; i++) {
        user = Users[i];
        if (user.id == paramId) {
            res = user;
        }
    }
    return res;
}