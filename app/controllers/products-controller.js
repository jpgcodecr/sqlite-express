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

// Edit products
exports.productsEdit = async (req, res) => {

  const updatedElements = {};

  if (req.body.name) { updatedElements.name = req.body.name };
  if (req.body.price > -1) { updatedElements.price = req.body.price };
  if (req.body.stock > -1) { updatedElements.stock = req.body.stock };

  console.log(req.body);
  console.log('updatedElements', updatedElements);

  knex('products')
    .where({code: req.body.code})
    .update(updatedElements)
    .then(() => {
      res.json({ message: `Product ${req.body.code} updated.` })
    })
    .catch(err => {
      res.json({ message: `There was an error updating ${req.body.code} Product: ${err}` })
    })
}

// Remove products
exports.productsDelete = async (req, res) => {
  knex('products')
    .where('id', req.body.code)
    .del()
    .then(() => {
      res.json({ message: `Product ${req.body.code} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.code} Product: ${err}` })
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