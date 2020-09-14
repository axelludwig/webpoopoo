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
        }
    }
}
