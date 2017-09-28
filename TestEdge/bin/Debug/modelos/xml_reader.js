var XmlManager = require('./xml_manager.js');

var manager = new XmlManager('../var_config.xml');

var obj = manager.getXmlFromFile();
debugger;