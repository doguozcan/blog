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

  const post = await Post.create({ title, content, author: authorId })

  if (post) {
    return res
      .status(201)
      .json({ message: `Post with id ${post._id} created successfully!` })
  }
})

const getPosts = asyncHandler(async (_, res, next) => {
  const posts = await Post.find({}).populate('author')

  if (posts.length === 0) {
    let error = new Error('No posts found.')
    error.statusCode = 404
    return next(error)
  }

  return res.status(200).json(posts)
})

const getPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params

  if (!postId) {
    let error = new Error('Post id is required.')
    error.statusCode = 400
    return next(error)
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    let error = new Error('Post id format is invalid.')
    error.statusCode = 400
    return next(error)
  }

  const post = await Post.findById(postId).populate('author')

  if (!post) {
    let error = new Error('Post not found.')
    error.statusCode = 404
    return next(error)
  }

  return res.status(200).json(post)
})

const updatePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params

  if (!postId) {
    let error = new Error('Post id is required.')
    error.statusCode = 400
    return next(error)
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    let error = new Error('Post id format is invalid.')
    error.statusCode = 400
    return next(error)
  }

  const post = await Post.findById(postId)

  if (!post) {
    let error = new Error('Post not found.')
    error.statusCode = 404
    return next(error)
  }

  const { title, content, authorId } = req.body

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

  if (title) {
    post.title = title
  }

  if (content) {
    post.content = content
  }

  if (authorId) {
    post.author = authorId
  }

  const updatedPost = await post.save()

  res.status(200).json({
    message: `Post with id ${updatedPost._id} updated successfully!`,
    updatedPost,
  })
})

const deletePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params

  if (!postId) {
    let error = new Error('Post id is required.')
    error.statusCode = 400
    return next(error)
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    let error = new Error('Post id format is invalid.')
    error.statusCode = 400
    return next(error)
  }

  const deletedPost = await Post.findByIdAndDelete(postId)

  if (!deletedPost) {
    let error = new Error('Post not found so it cannot be deleted.')
    error.statusCode = 404
    return next(error)
  }

  return res.status(200).json({
    message: `Post with id ${deletedPost._id} deleted successfully!`,
    postId: deletedPost._id,
    authorId: deletedPost.author,
  })
})

module.exports = { createPost, getPosts, getPost, updatePost, deletePost }
