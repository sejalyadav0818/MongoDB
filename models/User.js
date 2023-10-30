const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true, // `email` must be unique across all users
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },

  password: {
    type: String,
    required: true,
    minlength: 8, // At least 8 characters
    // validate: {
    //   validator: function (value) {
    //     // Ensure the password doesn't contain the word "password" for simplicity
    //     return !validator.contains(value.toLowerCase(), "password");
    //   },
    //   message: "Password should not contain the word 'password'",
    // },
  },
});
User.plugin(mongoosePaginate);

module.exports = mongoose.model("User", User);
