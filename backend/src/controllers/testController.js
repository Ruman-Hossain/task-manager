const Tasks = require("../models/Tasks");
exports.testQuery = (req, res) => {
	console.log("Test Qeuery Started");

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
			$project: {
				_id: 0,
				title: 1,
				description: 1,
				start_date: 1,
				end_date: 1,
				"user.full_name": 1,
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
