const Author = require('../models/Author')
const Post = require('../models/Post')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

const createAuthor = asyncHandler(async (req, res, next) => {
  const { name } = req.body

  if (!name) {
    let error = new Error('Author must have a name.')
    error.statusCode = 400
    return next(error)
  }

  const existingAuthor = await Author.findOne({ name })

  if (existingAuthor) {
    let error = new Error('Author with the same name exists.')
    error.statusCode = 400
    return next(error)
  }

  const author = await Author.create({ name })

  if (author) {
    return res.status(201).json({
      message: `Author ${name} with id ${author._id} created successfully!`,
    })
  }
})

const getAuthors = asyncHandler(async (_, res, next) => {
  const authors = await Author.find({})

  if (authors.length === 0) {
    let error = new Error('No authors found.')
    error.statusCode = 404
    return next(error)
  }

  return res.status(200).json(authors)
})

const getAuthorPosts = asyncHandler(async (req, res, next) => {
  const { authorId } = req.params

  if (!authorId) {
    let error = new Error('Author id is required.')
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
    let error = new Error('Author not found.')
    error.statusCode = 404
    return next(error)
  }

  const posts = await Post.find({ author: author._id })

  return res.status(200).json({ author, posts })
})

const updateAuthor = asyncHandler(async (req, res, next) => {
  const { authorId } = req.params

  if (!authorId) {
    let error = new Error('Author id is required.')
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
    let error = new Error('Author not found.')
    error.statusCode = 404
    next(error)
  }

  const { name } = req.body

  if (!name) {
    let error = new Error('No name entered.')
    error.statusCode = 400
    next(error)
  }

  const existingAuthor = await Author.findOne({ name })

  if (existingAuthor) {
    let error = new Error('Author with the same name exists.')
    error.statusCode = 400
    return next(error)
  }

  author.name = name
  await author.save()

  const authorPosts = await Post.find({ author: author._id })
  const authorsPostsIds = authorPosts.map((post) => post._id)

  return res.status(200).json({
    message: `Author with id ${author._id} updated successfully!`,
    authorId: author._id,
    authorsPostsIds,
  })
})

const deleteAuthor = asyncHandler(async (req, res, next) => {
  const { authorId } = req.params

  if (!authorId) {
    let error = new Error('Author id is required.')
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
    let error = new Error('Author not found.')
    error.statusCode = 404
    return next(error)
  }

  const authorPosts = await Post.find({ author: author._id })
  const authorsPostsIds = authorPosts.map((post) => post._id)

  // delete posts related with the author
  await Post.deleteMany({ author: author._id })

  // delete the author
  await Author.findOneAndDelete({ _id: authorId })

  return res.status(200).json({
    message: 'Author and all related posts are deleted.',
    authorId: author._id,
    authorsPostsIds,
  })
})

module.exports = {
  createAuthor,
  getAuthors,
  getAuthorPosts,
  updateAuthor,
  deleteAuthor,
}
