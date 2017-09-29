function XmlManager(file) {
	this.file = file;
	this.variable_list = [];
	this.device_list = [];

	var self = this;
	var fs = require("fs");
	var xml2js = require("xml2js");
	var XMLWriter = require('xml-writer');

	var xw = new XMLWriter(true);
	var parser = new xml2js.Parser();
	var builder = new xml2js.Builder();

	this.getXmlFromFile = function() {
		var data = fs.readFileSync(this.file);

		parser.parseString(data, (err, result) => {
			if (err) throw err;
			self.device_list = getDevices(result.config.devices[0].device);
			self.variable_list = getVariables(result.config.devices[0].device);
		});

		var data_object = {devices: self.device_list, variables: self.variable_list};
		return data_object;
	}

	this.makeXmlFile = function(data) {
		var xw = new XMLWriter;
		xw.startDocument();
			xw.startElement('config');
				xw.writeAttribute('port', '4334');
				xw.writeAttribute('resource_path', 'UA/OPCUAServer');
				xw.startElement('buildInfo');
					xw.writeAttribute('date', '2017/09/29');
					xw.writeAttribute('buildNumber', '1');
					xw.writeAttribute('product', 'AmiGeServer');
				xw.endElement();
				xw.startElement('devices');
					Object.keys(data).map( (device) => {
						if (device == 'DeviceMethods') return true;
						xw.startElement('device');
						xw.writeAttribute('id', device);
							xw.startElement('variables');
							Object.keys(data[device]).map((variable) => {
								var obj = data[device][variable];
								xw.startElement('variable');
								xw.writeAttribute('id', obj.getId());
								xw.writeAttribute('type', obj.getDataType());
								xw.writeAttribute('nodeId', obj.getNodeId());
								xw.writeAttribute('name', obj.getName());
								xw.text(obj.getValue());
								xw.endElement();
							})
							xw.endElement();
						xw.endElement();
					}, this);
				xw.endElement();
		xw.endDocument();
		fs.writeFileSync(this.file, xw.toString());
	}

	getDevices = function(devices) {
		var dev = require("./device.js");
		return devices.map((device) => {
			return new dev(device.$.id);
		});
	}

	getVariables = function(devices) {
		var variable = require("./variable.js");
		return devices.map((device)=> {
			this.device_id = device.$.id;
			return device.variables[0].variable.map((variab) => {
				return new variable(
								variab.$.id,
								variab.$.type,
								variab.$.nodeId,
								variab.$.name,
								variab._,
								device_id );
			}, this);
		});
	}
}

module.exports = XmlManager;
