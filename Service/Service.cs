

using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Web;

namespace TestEdge
{

    // Define a service contract
    [ServiceContract(Namespace = "TestEdge")]
    public interface IComunicationApi
    {
        [WebGet(UriTemplate = "AddVariable/{device}", ResponseFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void AddVariable(string device);

        [WebGet(UriTemplate = "DeleteVariable/{device}", ResponseFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void DeleteVariable(string device);

        [WebGet(UriTemplate = "ListVariable", ResponseFormat = WebMessageFormat.Xml)]

        [OperationContract]
        string ListVariable();

    }

    // Service class which implements the service contract
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class ApiService : IComunicationApi
    {
       // Host the service within this EXE console application
        public static void Main()
        {

            // Create a ServiceHost for the CalculatorService type
            using (ServiceHost serviceHost = new ServiceHost(typeof(ApiService)))
            {

                serviceHost.Authorization.ServiceAuthorizationManager = new MyServiceAuthorizationManager();
                // Open the ServiceHost to create listeners and start listening for messages
                serviceHost.Open();
                
                // The service can now be accessed
                Console.WriteLine("The service is ready.");
                Console.WriteLine("Press <ENTER> to terminate service.");
                Console.WriteLine();
                Console.ReadLine();

            }
        }

        void IComunicationApi.AddVariable(string device)
        {
            
           
            Newtonsoft.Json.Linq.JObject jObject = Newtonsoft.Json.Linq.JObject.Parse(device);

            // Instead of WriteLine, 2 or 3 lines of code here using WebClient to download the file
            
            Console.WriteLine((string)jObject["deviceid"]);
            Console.WriteLine((string)jObject["variableid"]);
            Console.WriteLine((string)jObject["type"]);
            Console.WriteLine((string)jObject["length"]);

            OPCServerService singleton = OPCServerService.Instance;
            singleton.Add(device);

            
        }

        void IComunicationApi.DeleteVariable(string device)
        {
            Newtonsoft.Json.Linq.JObject jObject = Newtonsoft.Json.Linq.JObject.Parse(device);

            // Instead of WriteLine, 2 or 3 lines of code here using WebClient to download the file

            Console.WriteLine((string)jObject["deviceid"]);
            Console.WriteLine((string)jObject["variableid"]);
            Console.WriteLine((string)jObject["type"]);
            Console.WriteLine((string)jObject["length"]);

            OPCServerService singleton = OPCServerService.Instance;
            singleton.Delete(device);
        }
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        string IComunicationApi.ListVariable()
        {
            Console.WriteLine(this.ToString());
            return "Prueba";
        }
       
        public override string ToString()
        {
            return "To String del servicio";
        }
    }

}
