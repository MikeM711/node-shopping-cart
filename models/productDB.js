const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;


const productSchema = new Schema({
	name: String,
	description: String,
	price: Number,
	stock: Number

}, { collection: 'products' });

// custom schema method
// courseSchema.methods.getDeveloperNames = function () {
// 	return this.courseDevelopers.map(
// 		(elem) => {
// 			return elem.firstName + ' ' +
// 				elem.lastName;
// 		}).join(',');
// };

module.exports.getModel = () => {
	if (connection == null) {
		console.log("Creating connection and model...");
		connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
		model = connection.model("ProductModel", productSchema);
	};
	return model;
};
