const Author = require('../models/Author')
const asyncHandler = require('express-async-handler')

const createAuthor = asyncHandler(async (req, res, next) => {
  const { name } = req.body

  if (!name) {
    let error = new Error('Author must have a name')
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
    let error = new Error('No authors found')
    error.statusCode = 404
    return next(error)
  }

  return res.status(200).json(authors)
})

module.exports = { createAuthor, getAuthors }
