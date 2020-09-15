using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;

namespace WebPooPooServer
{
    class Program
    {
        static void Main(string[] args)
        {
            var allSockets = new List<IWebSocketConnection>();
            var server = new WebSocketServer("ws://0.0.0.0:7777");

            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Console.WriteLine("Open!");
                    
                    allSockets.Add(socket);
                    User user = new User(socket);
                    socket.Send("getmyid|" + user.Id);
                };
                socket.OnClose = () =>
                {
                    Console.WriteLine("Close!");
                    User.RemoveUser(getSocketId(socket));
                    allSockets.Remove(socket);
                };
                socket.OnMessage = message =>
                {
                    Console.WriteLine("recieved : " + message);
                    string response = MainManager.ProcessMessage(message, getSocketId(socket));
                    if (response != null)
                        socket.Send(response);
                };
            });

            var input = Console.ReadLine();
            while (input != "exit")
            {
                foreach (var socket in allSockets.ToList())
                {
                    socket.Send(input);
                }
                input = Console.ReadLine();
            }
        }

        public static string getSocketId(IWebSocketConnection socket)
        {
            return socket.ConnectionInfo.Id.ToString();
        }
    }
}
