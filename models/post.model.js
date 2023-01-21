const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  abstract: {
    type: String
  },
  content: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Types.ObjectId, ref: "users", require: true
  }
});

const post = mongoose.model("post", postSchema);
module.exports = post;