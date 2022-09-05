// Import dependencies
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const productsRouter = require('./app/routes/products-route')
const PORT = process.env.PORT || 4001
const app = express()

// Apply middleware
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json());

// Implement books route
app.use('/products', productsRouter)

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})