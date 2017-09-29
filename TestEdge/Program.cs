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
            Console.WriteLine("start");
            string script = File.ReadAllText("server/index.js");
            var func = Edge.Func(script);

            Console.WriteLine(await func(".NET"));
           
            var invoke = func.Invoke(new
            {

                functionName = "createVariableMethod",
                 id = "A1",
                dataType = "int",
                nodeId = "ns = 1; b = 1030FFAA",
                name = "Temp",
                value = "0",
                device = "device1"


        });
            
            Console.WriteLine("done");
        }
    

        static void Main(string[] args)
        {
            Start().Wait();
        }
    }
}
