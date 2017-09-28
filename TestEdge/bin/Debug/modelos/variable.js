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
		var value;
		switch(this.dataType){
			case 'Integer':
				value = parseInt(this.value);
				break;
			case 'Double':
				value = parseFloat(this.value);
				break;
			default:
				value = this.value;
		}
		return value;
	}

	getDataType() {
		return this.dataType;
	}

	getDevice() {
		return this.device;
	}
}

module.exports = Variable;