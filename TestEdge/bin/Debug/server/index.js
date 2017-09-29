var opcua = require("node-opcua");

return function() {
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
    var variables = [];
    var data = []

    function post_initialize() {
        console.log("initialized!");

    	function construct_my_address_space(server) {

    		var addressSpace = server.engine.addressSpace;

            devices['DeviceMethods'] = addDevice(new Device('DeviceMethods'));

            var manager = new XmlManager('./var_config.xml');
            data = manager.getXmlFromFile();
            data.devices.map((device) => {devices[device.getName()] = addDevice(device)});

            data.variables.map((variables) => {
                variables.map( (variable) => { 
                    addVariable(variable, devices[variable.getDevice()]);
                });
            });

            var createVariableMethod = addressSpace.addMethod(devices['DeviceMethods'], {
                browseName: "create variable method",

                inputArguments: [
                    {
                        name: "id",
                        description: { text: "specify the unique id for this variable"},
                        dataType: opcua.DataType.String
                    },{
                        name: "data type",
                        description: { text: "Specifies the type of data for this variable"},
                        dataType: opcua.DataType.String
                    },{
                        name: "node id",
                        description: { text: "Specify the node id for this variable"},
                        dataType: opcua.DataType.String
                    },{
                        name: "name",
                        description: { text: "Name this variable"},
                        dataType: opcua.DataType.String
                    },{
                        name: "value",
                        description: { text: "Specify value of the variable"},
                        dataType: opcua.DataType.UInt32
                    },{
                        name: "device",
                        description: { text: "Specify value of the device owner for this variable"},
                        dataType: opcua.DataType.String
                    }
                ],
                outputArguments: [{
                    name: "New variable",
                    description: { text: "The generated variable"},
                    dataType: opcua.DataType.String,
                    valueRank: 1
                }]
            });

            createVariableMethod.bindMethod(function(inputArguments, context, callback){
                var id = inputArguments[0].value;
                var dataType = inputArguments[1].value;
                var nodeId = inputArguments[2].value;
                var name = inputArguments[3].value;
                var value = inputArguments[4].value;
                var device = inputArguments[5].value;

                var newVariable = new Variable(id, dataType, nodeId, name, value, device)
                addVariable(newVariable, devices[newVariable.getDevice()]);

                console.log(nodeId, ": Se ha creado una variable con el nombre de '", name, "' con el valor de '", value, "'");

                manager.makeXmlFile(variables);
                console.log("Se ha generado un nuevo xml.");

                var callMethodResult = {
                    statusCode: opcua.StatusCodes.Good,
                    outputArguments: [{
                        dataType: opcua.DataType.String,
                        arrayType: opcua.VariantArrayType.Array,
                        value: newVariable
                    }]
                };
                callback(null, callMethodResult);
            });

            function addDevice(device) {
                variables[device.getName()] = [];
                return addressSpace.addObject({
                    organizedBy: addressSpace.rootFolder.objects,
                    browseName: device.getName()
                });
            }
            
            function addVariable(variable, device) {
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
                variables[variable.getDevice()][variable.getId()] = variable;
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

};