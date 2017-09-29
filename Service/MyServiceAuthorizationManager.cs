using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Text;
using System.Threading.Tasks;

namespace TestEdge
{
    public class MyServiceAuthorizationManager : ServiceAuthorizationManager
    {
        protected override bool CheckAccessCore(OperationContext operationContext)
        {

            HttpResponseMessageProperty responseProperties = new HttpResponseMessageProperty();
            HttpRequestMessageProperty requestProperties = new HttpRequestMessageProperty();

            
            responseProperties.Headers.Add("Access-Control-Allow-Origin", "*");
            requestProperties.Headers.Add("Access-Control-Allow-Methods", "GET, POST");
            requestProperties.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Accept");

            operationContext.OutgoingMessageProperties.Add(HttpResponseMessageProperty.Name, responseProperties);
            operationContext.OutgoingMessageProperties.Add(HttpRequestMessageProperty.Name, requestProperties);

            return true;
        }
    }
}
