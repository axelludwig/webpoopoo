using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebPooPooServer
{
    public class User
    {
        public string UserName;
        public string Id;
        public IWebSocketConnection Socket;

        public User(IWebSocketConnection socket)
        {
            Socket = socket;
            Id = socket.ConnectionInfo.Id.ToString();
            MainManager.Users.Add(this);
        }

        public string CreateRoom()
        {
            if (UserName == null)
            {
                return "errorNoUserName";
            }
            Room room = new Room();
            SocketSender.SendToAllUsers("newroom|" + room.Id + "," + room.Name);
            return JoinRoom(room.Id);
        }

        public Room GetRoom()
        {
            return MainManager.Rooms.Where(rooms => rooms.Users.Contains(this)).First();
        }

        public static User GetUserFromId(string id)
        {
            return MainManager.Users.Where(users => users.Id == id).FirstOrDefault();
        }

        public static void RemoveUser(string id)
        {
            MainManager.Users.Remove(GetUserFromId(id));
        }

        public string SetName(string name)
        {
            if (MainManager.Users.Where(users => users.UserName == name).FirstOrDefault() == null)
            {
                if (string.IsNullOrEmpty(name))
                {
                    return "errorNotValidUserName";
                }
                UserName = name;
                SocketSender.SendToAllUsers("newname|" + Id + "," + name);
                return "ok";
            }
            return "errorNameAlreadyUsed";
        }

        public string JoinRoom(int roomId)
        {
            if (UserName == null)
            {
                return "errorNoUserName";
            }

            Room room = Room.GetRoomFromId(roomId);
            if (!room.Users.Contains(this))
            {
                room.Users.Add(this);
                SocketSender.SendToAllUsers("userjoinroom|" + Id + "," + roomId);
                return null;
            }
            else
            {
                return "errorAlreadyInRoom";
            }
        }

        public string SendLink(string link)
        {
            if (UserName == null)
            {
                return "errorNoUserName";
            }

            SocketSender.SendToUserRoomExceptUser(this, link);
            return "ok";
        }
    }
}
