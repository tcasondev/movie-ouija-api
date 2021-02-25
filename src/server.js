const app = require('./app')

const {PORT, DATABASE_URL} = require('./config')
const pg = require('pg'); pg.defaults.ssl = process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

