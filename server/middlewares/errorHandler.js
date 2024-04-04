const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal server error'

  if (err.code && err.code === 11000) {
    message = 'Author name is already in the database.'
    statusCode = 400
  }

  res.status(statusCode).json({ message })
}

module.exports = errorHandler
