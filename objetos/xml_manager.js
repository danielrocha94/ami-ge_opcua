class XmlManager {

	constructor(message){
		this.message = message;
	}

	display() {
		return this.message;
	}

	readXml() {
		console.log("xml read");
		return true;
	}
}