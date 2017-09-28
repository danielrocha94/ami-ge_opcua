class Variable {
	constructor(id, dataType, nodeId, name, value, device ) {
		this.id = id;
		this.nodeId = nodeId;
		this.name = name;
		this.value = value;
		this.dataType = dataType;
		this.device = device;
	}

	getId() {
		return this.id;
	}

	getNodeId() {
		return this.nodeId;
	}

	getName() {
		return this.name;
	}

	getValue() {
		return parseInt(this.value);
	}

	getDataType() {
		return this.dataType;
	}

	getDevice() {
		return this.device;
	}
}

module.exports = Variable;