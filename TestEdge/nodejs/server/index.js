var opcua = require("node-opcua");
var Device = require("../modelos/device.js");
var Variable = require("../modelos/variable.js");
var XmlManager = require('../modelos/xml_manager.js');

var server = new opcua.OPCUAServer({
    port: 4334, // the port of the listening socket of the server
    resourcePath: "UA/OPCUAServer", // this path will be added to the endpoint resource name
     buildInfo : {
        productName: "AmiGeServer",
        buildNumber: "1", // write and read value to xml
        buildDate: new Date(2014,5,2)
    }
});

var devices = [];
var data = []

function post_initialize() {
	console.log("initialized!");

	function construct_my_address_space(server) {

		var addressSpace = server.engine.addressSpace;

        var manager = new XmlManager('./var_config.xml');
        data = manager.getXmlFromFile();
        data.devices.map((device) => {devices[device.getName()] = addDevice(device)});
        
        data.variables.map((variables) => {
            variables.map( (variable) => { 
                addVariable(variable, devices[variable.getDevice()]);
            });
        });

        function addDevice(device) {
            return addressSpace.addObject({
                organizedBy: addressSpace.rootFolder.objects,
                browseName: device.getName()
            });
        }
        
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