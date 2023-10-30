const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Cars = new mongoose.Schema({
  title: String,
  year: String,
});
Cars.plugin(mongoosePaginate);

module.exports = mongoose.model("Cars", Cars);
