var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SubCategorySchema = new Schema({
	name: {
		type: String,
	},
	category_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "categories",
	},
});

const SubCategories = mongoose.model("subcategories", SubCategorySchema);
module.exports = SubCategories;
