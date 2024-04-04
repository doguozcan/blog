const express = require('express')
const router = express.Router()

const { createPost, getPosts, getPost } = require('../controllers/post')

router.post('/', createPost).get('/', getPosts).get('/:postId', getPost)

module.exports = router
