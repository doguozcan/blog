require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const authorRoute = require('./routes/author')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())

app.use('/author', authorRoute)
app.use(errorHandler)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to the DB successfully!')
    app.listen(port, () => console.log(`Listening on port ${port}`))
  } catch (error) {
    console.log(error.message)
  }
}

start()
