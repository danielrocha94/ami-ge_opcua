var opcua = require("node-opcua");
var xmlManager = require("./xml_manager.js");

var server = new opcua.OPCUAServer({
    port: 4334, // the port of the listening socket of the server
    resourcePath: "OPCUAServer", // this path will be added to the endpoint resource name
     buildInfo : {
        productName: "AmiGeServer",
        buildNumber: "1", // write and read value to xml
        buildDate: new Date(2014,5,2)
    }
});

function post_initialize() {
	console.log("initialized!");

	function construct_my_address_space(server) {

		var addressSpace = server.engine.addressSpace;

        var device = addressSpace.addObject({
            organizedBy: addressSpace.rootFolder.objects,
            browseName: "MyDevice"
        });
        
        debugger;
        const xml = new xmlManager("message");
        xml.display();
        //read xml saved variables and create them using this method
        function loadXmlVariables(xmlFile){

        }

        // adds new variable
        function addVariable(variable) {
        	addressSpace.addVariable({
            	componentOf: device,
            	browseName: "MyVariable1",
            	dataType: "Double",
            	value: {
                	get: function () {
                    	return new opcua.Variant({dataType: opcua.DataType.Double, value: variable1 });
                	}
            	}
        	});
        }
	}
	construct_my_address_space(server);

    server.start(function() {
        console.log("Server is now listening ... ( press CTRL+C to stop)");
        console.log("port ", server.endpoints[0].port);
        var endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
        console.log(" the primary server endpoint url is ", endpointUrl );
    });


}

server.initialize(post_initialize);