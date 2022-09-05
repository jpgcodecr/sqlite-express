const knex = require('../../config/db');

// Get all products from database
exports.productsAll = async (req, res) => {
  knex
    .select('*')
    .from('products')
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving products: ${err}` })
    })
}

// Get specific product from database
exports.product = async (req, res) => {
  knex
    .select('*')
    .from('products')
    .where({ code: req.params.code })
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving products: ${err}` })
    })
}

// Create product
exports.productsCreate = async (req, res) => {
  knex('products')
    .insert({
      'name': req.body.name,
      'code': req.body.code,
      'price': req.body.price,
      'stock': req.body.stock
    })
    .then(() => {
      res.json({ message: `Product \'${req.body.name}\' created.` })
    })
    .catch(err => {
      res.json({ message: `There was an error creating ${req.body.name} product: ${err}` })
    })
}

// Remove products
exports.productsDelete = async (req, res) => {
  knex('products')
    .where('id', req.body.id)
    .del()
    .then(() => {
      res.json({ message: `Product ${req.body.id} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.id} Product: ${err}` })
    })
}

// Remove all products from database
exports.productsReset = async (req, res) => {
  knex
    .select('*')
    .from('products')
    .truncate()
    .then(() => {
      res.json({ message: 'Product list cleared.' })
    })
    .catch(err => {
      res.json({ message: `There was an error resetting product list: ${err}.` })
    })
}