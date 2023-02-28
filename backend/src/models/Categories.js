var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CategorySchema = new Schema(
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
	},
	{ versionKey: false }
);
const Categories = mongoose.model("categories", CategorySchema);
module.exports = Categories;
