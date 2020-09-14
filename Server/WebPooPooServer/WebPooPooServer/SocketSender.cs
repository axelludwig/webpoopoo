using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebPooPooServer
{
    public static class SocketSender
    {
        public static void SendToUserRoomExceptUser(User puser, string message)
        {
            foreach (User user in puser.GetRoom().Users)
            {
                if (user != puser)
                {
                    user.Socket.Send(message);
                }
            }
        }

        public static void SendToAllUsers(string message)
        {
            foreach (User user in MainManager.Users)
            {
                user.Socket.Send(message);
            }
        }
    }
}
