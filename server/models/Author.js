const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({ name: { type: String, unique: true } })
const Author = mongoose.model('Author', authorSchema)

module.exports = Author
