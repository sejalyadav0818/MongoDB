const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
  },

  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
Post.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", Post);
