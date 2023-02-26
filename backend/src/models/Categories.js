var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});
const Categories = mongoose.model("categories", CategorySchema);
module.exports = Categories;
