function XmlManager(file) {
	this.file = file;
	this.variable_list = [];
	this.device_list = [];

	var self = this;
	var fs = require("fs");
	var xml2js = require("xml2js");

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
