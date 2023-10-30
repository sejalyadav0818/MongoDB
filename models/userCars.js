const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const userCarSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Cars" },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

userCarSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("userCarSchema", userCarSchema);
