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
                rooms.Add(room.Id + "," + room.Name + ",users[" + string.Join("-", users) + "]");
            }

            return "rooms|" + string.Join("_", rooms);
        }
    }
}
