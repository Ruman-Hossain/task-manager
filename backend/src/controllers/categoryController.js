const Catgories = require("../models/Categories");
exports.create = (req, res) => {
	res.status(200).json({ location: "Categories Create" });
};
exports.update = (req, res) => {
	res.status(200).json({ location: "Categories Update" });
};
exports.list = (req, res) => {
	res.status(200).json({ location: "Categories List" });
};
exports.delete = (req, res) => {
	res.status(200).json({ location: "Categories Delete" });
};
