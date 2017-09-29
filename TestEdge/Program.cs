using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EdgeJs;

namespace TestEdge
{
    class Program
    {
        public static async Task Start()
        {
            string script = File.ReadAllText("nodejs/server/index.js");
            var func = Edge.Func(script);

            Console.WriteLine(await func(".NET"));

        }

        static void Main(string[] args)
        {
            Start().Wait();
        }
    }
}
