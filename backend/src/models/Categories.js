var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CategorySchema = new Schema({
	name: {
		type: String,
	},
	category_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Categories",
	},
});
const Categories = mongoose.model("Categories", CategorySchema);
module.exports = Categories;
