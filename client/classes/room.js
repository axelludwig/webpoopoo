class Room {
    constructor(name) {
        this.name = name;
        this.users = new Array();
    }

    addUser(user) {
        this.users.push(user);
    }

    addUsers(list) {
        list.map((user) => {
            this.addUser(user);
        })
    }
}