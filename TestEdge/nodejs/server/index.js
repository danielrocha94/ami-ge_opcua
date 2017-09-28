var opcua = require("node-opcua");
var Device = require("../modelos/device.js");
var Variable = require("../modelos/variable.js");

var server = new opcua.OPCUAServer({
    port: 4334, // the port of the listening socket of the server
    resourcePath: "UA/OPCUAServer", // this path will be added to the endpoint resource name
     buildInfo : {
        productName: "AmiGeServer",
        buildNumber: "1", // write and read value to xml
        buildDate: new Date(2014,5,2)
    }
});

var device1 = new Device("Device1");
var var1 = new Variable("primer variable", "ns=1;b=1020FFAA", "Variable", 5.00, "Double", "Device1");
var var2 = new Variable("segunda variable", "ns=1;b=1020FFAB", "Variable", 23, "Integer", "Device1")
var devices = [];

function post_initialize() {
	console.log("initialized!");

	function construct_my_address_space(server) {

		var addressSpace = server.engine.addressSpace;

        function addDevice(device) {
            return addressSpace.addObject({
                organizedBy: addressSpace.rootFolder.objects,
                browseName: device.getName()
            });
        }
        
        function loadXmlVariables(xmlFile){}


        function addVariable(variable, device) {
            debugger;
        	addressSpace.addVariable({
                nodeId: variable.getNodeId(),
            	componentOf: device,
            	browseName: variable.getId(),
            	dataType: variable.getDataType(),
            	value: {
                	get: function () {
                    	return new opcua.Variant({dataType: opcua.DataType.Double, value: variable.getValue() });
                	}
            	}
        	});
        }

        devices[device1.getName()] = addDevice(device1);
        addVariable(var1, devices[var1.getDevice()]);
        addVariable(var2, devices[var2.getDevice()])
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