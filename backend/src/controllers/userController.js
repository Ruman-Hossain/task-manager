const Users = require("../models/Users");
exports.signup = (req, res) => {
	res.status(200).json({ location: "User SignUp" });
};
exports.login = (req, res) => {
	res.status(200).json({ location: "User Login" });
};
exports.update = (req, res) => {
	res.status(200).json({ location: "User Update" });
};
exports.logout = (req, res) => {
	res.status(200).json({ location: "User Logout" });
};
