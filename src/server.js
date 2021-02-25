const app = require('./app')

const {PORT} = require('./config')
const pg = require('pg'); pg.defaults.ssl = process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false;
// const knexInstance = knex({
//   client: 'pg',
//   connection: process.env.DB_URL
// })
//app.set('db', knexInstance)
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

