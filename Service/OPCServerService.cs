using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TestEdge
{
    public class OPCServerService
    {
        private static OPCServerService _instance;

        private OPCServerService()
        {
            
        }

        public static OPCServerService Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new OPCServerService();
                return _instance;
            }
        }

        public void Add(string v)
        {
            Console.WriteLine("Se agrego va0");
        }
        public void Delete( string v)
        {

        }
        public List<Variable> List ()
        {
            List<Variable> listaDeVariables = new List<Variable>();
            listaDeVariables.Add(new Variable(){Id = "1", Length = 0, Type = "int"});
            listaDeVariables.Add(new Variable(){Id = "2", Length = 0, Type = "int"});
            listaDeVariables.Add(new Variable(){Id = "3", Length = 0, Type = "int"});
            return listaDeVariables;
        }
    }
}
