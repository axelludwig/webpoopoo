class Room {
    constructor(id, name) {
        this.name = name;
        this.users = new Array();
        this.id = id;
        Rooms.push(this);
    }

    addUser(user) {
        var room = user.getRoom();
        if (room != null) {
            room.removeUser(user);
        }
        this.users.push(user);
    }

    addUsers(list) {
        list.map((user) => {
            this.addUser(user);
        })
    }

    removeUser(user) {
        index = this.users.indexOf(user);
        if (index > -1) {
            this.users.splice(index, 1);
        }
    }
}

function GetRoomById(paramId) {
    res = null;
    for (let i = 0; i < Rooms.length; i++) {
        room = Rooms[i];
        if (room.id == paramId) {
            
            res = room;
        }
    }
    return res;
}