using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebPooPooServer
{
    public class Room
    {
        public int Id;
        public string Name;
        public static int maxId = 0;
        public List<User> Users;

        public Room()
        {
            Id = maxId;
            maxId++;
            Name = "Room " + Id;
            Users = new List<User>();
            MainManager.Rooms.Add(this);
        }

        public static Room GetRoomFromId(int id)
        {
            return MainManager.Rooms.Where(rooms => rooms.Id == id).FirstOrDefault();
        }

        public static string DisplayRooms(string userName)
        {
            if (userName == null)
            {
                return "errorNoUserName";
            }

            List<string> rooms = new List<string>();
            foreach (Room room in MainManager.Rooms)
            {
                List<string> users = new List<string>();
                foreach(User user in room.Users)
                {
                    users.Add(user.Id + ":" + user.UserName);
                }
                rooms.Add(room.Id + "," + room.Name + "," + string.Join("&", users));
            }

            return "getrooms|" + string.Join("_", rooms);
        }

        public static string RemoveRoom(User user, int roomId)
        {
            if (user.UserName == null)
            {
                return "errorNoUserName";
            }
            Room room = GetRoomFromId(roomId);
            if (room == null)
            {
                return "errorRoomNotFound";
            }
            if (room.Users.Count != 0)
            {
                return "errorRoomNotEmpty";
            }
            MainManager.Rooms.Remove(room);
            SocketSender.SendToAllUsers("removeroom|" + room.Id);
            return null;
        }

        public static string CreateRoom(User user)
        {
            if (user.UserName == null)
            {
                return "errorNoUserName";
            }
            Room room = new Room();
            SocketSender.SendToAllUsers("newroom|" + room.Id + "," + room.Name);
            return user.JoinRoom(room.Id);
        }

        public static string RenameRoom(User user, string newName, int roomId)
        {
            if (user.UserName == null)
            {
                return "errorNoUserName";
            }
            Room room = Room.GetRoomFromId(roomId);
            if (room == null)
            {
                return "errorRoomNotFound";
            }
            room.Name = newName;
            SocketSender.SendToAllUsers("newroomname|" + room.Id + "," + room.Name);
            return null;
        }
    }
}
