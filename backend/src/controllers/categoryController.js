const Categories = require("../models/Categories");

// ! Create a new category

exports.create = async (req, res) => {
	try {
		const user_id = req.headers.user_id;
		const { name } = req.body;
		if (!name) {
			res.status(400).json({ error: "Name is required" });
		}

		const existingCategory = await Categories.findOne({ name });

		if (existingCategory) {
			res.status(400).json({ error: "Category already exists" });
		} else {
			const reqBody = { name: name, user_id: user_id };

			Categories.create(reqBody, (error, data) => {
				if (error) {
					res.status(400).json({ status: "fail", data: error });
				} else {
					res.status(200).json({ status: "Success", data: data });
				}
			});
		}
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

// ! Update the Categories

exports.update = async (req, res) => {
	try {
		const id = req.params.id;
		const query = { _id: id };
		const reqBody = req.body;
		Categories.updateOne(query, reqBody, (error, data) => {
			if (error) {
				res.status(400).json({
					status: "Category Update Failed",
					data: error,
				});
			} else {
				res.status(200).json({
					status: "Category Update Successful",
					data: data,
				});
			}
		});
	} catch (error) {
		res.status(400).json({ error: " Category Update fail" });
	}
};

// ! Get categories

exports.list = async (req, res) => {
  try {
    const user_id = req.headers.user_id;
		const list = await Categories.find(user_id);
		res.status(200).json(list);
	} catch (error) {
		res.status(400).json({ error: "No category list" });
	}
};

// ! Delete a category

exports.delete = async (req, res) => {
	try {
		const id = req.params.id;
		const query = { _id: id };
		Categories.deleteOne(query, (error, data) => {
			if (error) {
				res.status(400).json({
					status: "Category Delete Failed",
					data: error,
				});
			} else {
				res.status(200).json({
					status: "Category Delete Successful",
					data: data,
				});
			}
		});
	} catch (error) {
		res.status(400).json({ error: "Category Delete failed" });
	}
};
