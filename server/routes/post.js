const express = require('express')
const router = express.Router()

const { createPost, getPost } = require('../controllers/post')

router.post('/', createPost).get('/:postId', getPost)

module.exports = router
