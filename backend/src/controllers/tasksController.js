const Tasks = require("../models/Tasks");
exports.create = (req, res) => {
	res.status(200).json({ location: "Task Create" });
};
exports.update = (req, res) => {
	res.status(200).json({ location: "Task Update" });
};
exports.list = (req, res) => {
	res.status(200).json({ location: "Task List" });
};
exports.delete = (req, res) => {
	res.status(200).json({ location: "Task Delete" });
};
exports.deleteAll = (req, res) => {
	res.status(200).json({ location: "Task Delete All" });
};
