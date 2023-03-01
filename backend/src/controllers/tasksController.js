const Tasks = require("../models/Tasks");
exports.create = async (req, res) => {
	try {
		const { category_id, subcategory_id } = req.query;
		const inputData = req.body;
		const query = {
			category_id: category_id,
			subcategory_id: subcategory_id,
			title: inputData.title,
			description: inputData.description,
		}
		const existingTask = await Tasks.findOne(query);
		if (existingTask) {
			res.status(400).json({ error: "Tasks Already Exists" });
		} else {
			const end_date = new Date(inputData.end_date);
			const today = new Date();
			const daysdiff = end_date.getTime() - today.getTime();
			const remaining_days = Math.ceil(daysdiff / (1000 * 3600 * 24));
			inputData['remaining_time'] = remaining_days;
			inputData['user_id'] = req.headers.user_id;
			inputData['category_id'] = category_id;
			inputData['subcategory_id'] = subcategory_id;
			const data = await Tasks.create(inputData);
			res.status(200).json({ status: "Task Created Successfully", data: data });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.update = async (req, res) => {
	try {
		const { category_id, subcategory_id } = req.query;
		const task_id = req.params.id;
		const inputData = req.body;
		const query = {
			category_id: category_id,
			subcategory_id: subcategory_id,
			title: inputData.title,
			description: inputData.description,
		};
		const existingTask = await Tasks.findOne(query);
		if (existingTask) {
			res.status(400).json({ error: "Task already exists. Try a different one." });
		} else {
			const end_date = new Date(inputData.end_date);
			const today = new Date();
			const daysdiff = end_date.getTime() - today.getTime();
			const remaining_days = Math.ceil(daysdiff / (1000 * 3600 * 24));
			inputData.remaining_time = remaining_days;
			inputData.user_id = req.headers.user_id;
			inputData.category_id = category_id;
			inputData.subcategory_id = subcategory_id;
			const result = await Tasks.updateOne({ _id: task_id }, inputData);
			if (result.nModified > 0) {
				res.status(200).json({ status: "Task updated successfully", data: result });
			} else {
				res.status(400).json({ status: "Task update failed" });
			}
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
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
