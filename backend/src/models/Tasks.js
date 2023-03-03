var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TaskSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		start_date: {
			type: Date,
			required: true,
		},
		end_date: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			default: "Pending",

		},
		remaining_time: {
			type: Number,
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
		subcategory_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "subcategories",
		},
	},
	{ versionKey: false }
);

const Tasks = mongoose.model("tasks", TaskSchema);
module.exports = Tasks;
