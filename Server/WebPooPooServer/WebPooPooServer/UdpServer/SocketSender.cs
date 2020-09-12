using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace WebPooPooServer.UdpServer
{
    public class SocketSender
    {
        public void Send(string message, string adresse)
        {
            Socket sock = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);

            IPAddress serverAddr = IPAddress.Parse(adresse);

            IPEndPoint endPoint = new IPEndPoint(serverAddr, 11000);

            string text = "Hello";
            byte[] send_buffer = Encoding.ASCII.GetBytes(text);

            sock.SendTo(send_buffer, endPoint);
        }
    }
}
