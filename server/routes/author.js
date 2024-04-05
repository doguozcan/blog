const express = require('express')
const router = express.Router()

const {
  createAuthor,
  getAuthors,
  getAuthorPosts,
  deleteAuthor,
} = require('../controllers/author')

router
  .post('/', createAuthor)
  .get('/', getAuthors)
  .get('/:authorId', getAuthorPosts)
  .delete('/:authorId', deleteAuthor)

module.exports = router
