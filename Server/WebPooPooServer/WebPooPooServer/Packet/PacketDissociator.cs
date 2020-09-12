using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using WebPooPooServer.UdpServer;

namespace WebPooPooServer.Packet
{
    public static class PacketDissociator
    {
        public static string ProcessPacket(int id, string content, UDPSocket uDPSocket)
        {
            switch (id)
            {
                case 1:
                    string url = content;
                    break;
                case 2:


                    break;
            }

            return "caca";
        }
    }
}
