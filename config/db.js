// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, '../app/db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "books"
knex.schema
  .hasTable('products')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('products', (table)  => {
          table.increments('id').primary()
          table.string('name')
          table.integer('code')
          table.integer('price')
          table.integer('stock')
        })
        .then(() => {
          console.log('Table \'Products\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Debug
knex.select('*').from('products')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex