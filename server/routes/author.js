const express = require('express')
const router = express.Router()

const { createAuthor, getAuthors } = require('../controllers/author')

router.post('/', createAuthor).get('/', getAuthors)

module.exports = router
