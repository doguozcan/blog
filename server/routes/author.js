const express = require('express')
const router = express.Router()

const { createAuthor } = require('../controllers/author')

router.post('/', createAuthor)

module.exports = router
