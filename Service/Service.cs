

using System;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace TestEdge
{

    // Define a service contract
    [ServiceContract(Namespace = "TestEdge")]
    public interface IComunicationApi
    {
        [WebGet(UriTemplate = "Add/{v}", ResponseFormat = WebMessageFormat.Xml)]
        [OperationContract]
       void Add (string v);

        [WebGet(UriTemplate = "Delete/{v}", ResponseFormat = WebMessageFormat.Xml)]
        [OperationContract]
       void Delete (string v);

        [WebGet(UriTemplate = "List", ResponseFormat = WebMessageFormat.Xml)]

        [OperationContract]
       void List ();
       
    }

    // Service class which implements the service contract

    public class ApiService : IComunicationApi
    {
        public int Add (string v)
        {
           
            OPCServerService singleton = OPCServerService.Instance;
            singleton.Add(v);
            
            return 0;
        }

        public int Delete (string v)
        {
      
            OPCServerService singleton = OPCServerService.Instance;
            singleton.Delete(v);
            

            return 0;
        }

        public int List ()
        {
            OPCServerService singleton = OPCServerService.Instance;
            singleton.List();

            Console.WriteLine("List is ready.");
            return 0;
        }

       
        // Host the service within this EXE console application
        public static void Main()
        {
         
            // Create a ServiceHost for the CalculatorService type
            using (ServiceHost serviceHost = new ServiceHost(typeof(ApiService)))
            {
                // Open the ServiceHost to create listeners and start listening for messages
                serviceHost.Open();

                // The service can now be accessed
                Console.WriteLine("The service is ready.");
                Console.WriteLine("Press <ENTER> to terminate service.");
                Console.WriteLine();
                Console.ReadLine();
                
            }
        }

        void IComunicationApi.Add(string v)
        {
            Console.WriteLine(v.ToString());
        }

        void IComunicationApi.Delete(string v)
        {
            Console.WriteLine(v.ToString());
        }

        void IComunicationApi.List()
        {
            Console.WriteLine(ToString());
        }
    }

}
