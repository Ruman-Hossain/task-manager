var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	full_name: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	profile_pic: {
		type: String,
	},
	address: {
		type: String,
	},
	education: {
		type: String,
	},
	company_name: {
		type: String,
	},
	designation: {
		type: String,
	},
});
const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
