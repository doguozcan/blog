const Post = require('../models/Post')
const Author = require('../models/Author')
const mongoose = require('mongoose')

const asyncHandler = require('express-async-handler')

const createPost = asyncHandler(async (req, res, next) => {
  const { title, content, authorId } = req.body

  if (!title) {
    let error = new Error('Title must be provided.')
    error.statusCode = 400
    return next(error)
  }

  if (!content) {
    let error = new Error('Content must be provided.')
    error.statusCode = 400
    return next(error)
  }

  if (!authorId) {
    let error = new Error('Author id must be provided.')
    error.statusCode = 400
    return next(error)
  }

  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    let error = new Error('Author id format is invalid.')
    error.statusCode = 400
    return next(error)
  }

  const author = await Author.findById(authorId)

  if (!author) {
    let error = new Error('Author not found in the database.')
    error.statusCode = 404
    return next(error)
  }

  const post = await Post.create({ title, content, authorId })

  if (post) {
    return res
      .status(201)
      .json({ message: `Post with id ${post._id} created successfully!` })
  }
})

module.exports = { createPost }
