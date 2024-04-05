const express = require('express')
const router = express.Router()

const {
  createAuthor,
  getAuthors,
  getAuthorPosts,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/author')

router
  .post('/', createAuthor)
  .get('/', getAuthors)
  .get('/:authorId', getAuthorPosts)
  .patch('/:authorId', updateAuthor)
  .delete('/:authorId', deleteAuthor)

module.exports = router
