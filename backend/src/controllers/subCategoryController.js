const SubCategories = require("../models/SubCategories");
exports.create = (req, res) => {
	res.status(200).json({ location: "SubCategory Create" });
};
exports.update = (req, res) => {
	res.status(200).json({ location: "SubCategory Update" });
};
exports.searchByCategory = (req, res) => {
	res.status(200).json({ location: "SubCategory Search By Category" });
};
exports.delete = (req, res) => {
	res.status(200).json({ location: "SubCategory Delete" });
};
