using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TestEdge

{
    public class Variable
    {
        private string id;
        private string type;
        private int length; 
        
        public string Id
        {
            get { return id; }
            set { id = value; }
        }

        public string Type
        {
            get { return type; }
            set { type = value; }
        }

        public int Length
        {
            get { return length; }
            set { length = value; }
        }

        public override string ToString()
        {
            return string.Format("ID={0} Type={1} Length={2}", Id, Type, Length);
        }
    }
}
