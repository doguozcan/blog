const express = require('express')
const router = express.Router()

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/post')

router
  .post('/', createPost)
  .get('/', getPosts)
  .get('/:postId', getPost)
  .patch('/:postId', updatePost)
  .delete('/:postId', deletePost)

module.exports = router
