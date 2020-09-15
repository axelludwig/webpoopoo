using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebPooPooServer
{
    public static class MainManager
    {
        public static List<Room> Rooms = new List<Room>();
        public static List<User> Users = new List<User>();

        public static string ProcessMessage(string message, string userId)
        {
            try
            {
                string id = message.Split('|').First();
                string content = string.Empty;

                try
                {
                    content = message.Split('|')[1];
                }
                catch
                {

                }

                User user = User.GetUserFromId(userId);
                string response = string.Empty;

                switch (id)
                {
                    case "getrooms":
                        response = Room.DisplayRooms(user.UserName);
                        break;
                    case "newroom":
                        response = Room.CreateRoom(user);
                        break;
                    case "renameroom":
                        response = Room.RenameRoom(user, content.Split(',')[0], int.Parse(content.Split(',')[1]));
                        break;
                    case "removeroom":
                        response = Room.RemoveRoom(user, int.Parse(content));
                        break;
                    case "joinroom":
                        response = user.JoinRoom(int.Parse(content));
                        break;
                    case "leaveroom":
                        response = user.LeaveRoom();
                        break;
                    case "setname":
                        response = user.SetName(content);
                        break;
                    case "sendlink":
                        response = user.SendLink(content);
                        break;
                    default:
                        response = "commandNotFound";
                        break;
                }

                return response;
            }
            catch
            {
                return "error";
            }
        }
    }
}
