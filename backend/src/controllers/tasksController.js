const Tasks = require("../models/Tasks");
exports.create = async (req, res) => {
	try {
		const { category_id, subcategory_id } = req.query;
		const user_id = req.headers.user_id;
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
			inputData['user_id'] = user_id;
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
		const task_id = req.params.id;
		const inputData = req.body;
		const query = {
			title: inputData.title
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
			const result = await Tasks.updateOne({ _id: task_id }, inputData);
			if (result.modifiedCount > 0) {
				res.status(200).json({ status: "Task updated successfully", data: result });
			} else {
				res.status(400).json({ status: "Task update failed" });
			}
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.list = (req, res) => { //Tasks - Title, Description, Start, End, status | Categories- name  | Subcategories - name
	Tasks.aggregate([
		{
			$lookup: {
				from: "users",
				localField: "user_id",
				foreignField: "_id",
				as: "user",
			},
		},
		{
			$lookup: {
				from: "categories",
				localField: "category_id",
				foreignField: "_id",
				as: "category",
			},
		},
		{
			$lookup: {
				from: "subcategories",
				localField: "subcategory_id",
				foreignField: "_id",
				as: "subcategory",
			},
		},
		{
			$project: {
				_id: 1,
				title: 1,
				description: 1,
				start_date: 1,
				end_date: 1,
				remaining_time: 1,
				status: 1,
				"user.full_name": 1,
				"category.name": 1,
				"subcategory.name": 1,
			},
		},
	]).exec(function (err, tasks) {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(tasks);
		}
	});
};
exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		const query = { _id: id };
		const data = await Tasks.deleteOne(query);
		if (data.deletedCount === 1) {
			res.status(200).json({ status: "Task Deleted Scuccessfully", data: data });
		} else {
			res.status(201).json({ status: "Task Not Found To Delete" })
		}

	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
exports.deleteAll = async (req, res) => {
	try {
		const user_id = req.headers.user_id;
		const result = await Tasks.deleteMany({ user_id });
		res.status(200).json({ data: result });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
