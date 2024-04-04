const express = require('express')
const router = express.Router()

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
} = require('../controllers/post')

router
  .post('/', createPost)
  .get('/', getPosts)
  .get('/:postId', getPost)
  .patch('/:postId', updatePost)

module.exports = router
