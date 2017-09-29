using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EdgeJs;


namespace ClientEdge
{
    class Program
    {
        public static async Task Start()
        {

            string script1 = File.ReadAllText("TestClient.js");
            var func1 = Edge.Func(script1);

            Console.WriteLine(await func1(".NET"));


        }

        static void Main(string[] args)
        {
            Start().Wait();
        }
    }
}
