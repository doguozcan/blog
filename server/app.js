require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

app.get('/', (req, res) => {
  res.send('blog')
})

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
