const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  },
  { timestamps: true }
)
const Post = mongoose.model('Post', postSchema)

module.exports = Post
