const knex = require('../../config/db');

// Get all products from database
exports.productsAll = async (req, res) => {
  knex
    .select('*')
    .from('products')
    .then(userData => res.json(userData))
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
    .then(userData => res.json(userData))
    .catch(err => {
      res.json({ message: `There was an error retrieving products: ${err}` })
    })
  }

exports.productsSum = async (req, res) => {
  knex('products').count()
  .then(userData => res.json(userData))
  .catch(err => {
    res.json({ message: `There was an error retrieving products: ${err}` })
  })  
}

// Create product
exports.productsCreate = async (req, res) => {
  knex('products')
    .insert({
      'code': req.body.code,
      'name': req.body.name,
      'unit': req.body.unit,
      'barra': req.body.barra,
      'price': req.body.price,
      'stock': req.body.stock
    })
    .then(() => res.json({ message: `Product \'${req.body.name}\' created.` }))
    .catch(err => {
      res.json({ message: `There was an error creating ${req.body.name} product: ${err}` })
    })
}

// Edit product
exports.productsEdit = async (req, res) => {

  const updatedElements = {};

  if (req.body.name) { updatedElements.name = req.body.name };
  if (req.body.unit > -1) { updatedElements.stock = req.body.unit };
  if (req.body.barra > -1) { updatedElements.stock = req.body.barra };
  if (req.body.price > -1) { updatedElements.price = req.body.price };
  if (req.body.stock > -1) { updatedElements.stock = req.body.stock };
  

  knex('products')
    .where({code: req.body.code})
    .update(updatedElements)
    .then(() => res.json({ message: `Product ${req.body.code} updated.` }))
    .catch(err => {
      res.json({ message: `There was an error updating ${req.body.code} Product: ${err}` })
    })
}

// Remove product
exports.productsDelete = async (req, res) => {
  knex('products')
    .where({ code: req.body.code })
    .del()
    .then(() => res.json({ message: `Product ${req.body.code} deleted.` }))
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.code} Product: ${err}` })
    })
}

// Remove all products
exports.productsReset = async (req, res) => {
  knex
    .select('*')
    .from('products')
    .truncate()
    .then(() => res.json({ message: 'Product list cleared.' }))
    .catch(err => {
      res.json({ message: `There was an error resetting product list: ${err}.` })
    })
}