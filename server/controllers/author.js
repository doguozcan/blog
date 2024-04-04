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
    return res
      .status(201)
      .json({ message: `Author ${name} created successfully!` })
  }
})

module.exports = { createAuthor }
