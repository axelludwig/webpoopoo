using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebPooPooServer.Packet
{
    public static class SocketPacket
    {
        public static int GetId(string message)
        {
            return int.Parse(message.Split('|').First());
        }

        public static string GetContent(string message)
        {
            return message.Split('|')[1];
        }
    }
}
