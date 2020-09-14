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
        public static int maxId = 0;
        public List<User> Users;

        public Room()
        {
            Id = maxId;
            maxId++;
            Users = new List<User>();
            MainManager.Rooms.Add(this);
        }

        public List<User> GetUsersFromRoom(int id)
        {
            return MainManager.Rooms.Where(rooms => rooms.Id == id).FirstOrDefault().Users;
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

            List<string> res = new List<string>();
            foreach (Room room in MainManager.Rooms)
            {
                res.Add("Room " + room.Id);
            }

            return "rooms|" + string.Join(",", res);
        }
    }
}
