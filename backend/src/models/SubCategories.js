const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubCategorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "users",
		},
		category_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "categories",
		},
	},
	{ versionKey: false }
);
const SubCategories = mongoose.model("subcategories", SubCategorySchema);
module.exports = SubCategories;
