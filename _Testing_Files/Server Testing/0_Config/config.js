// app.js
const postgres = require('postgres')
const knex = require('knex')
require('dotenv').config()

// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env

const db = knex({
  client: 'pg', // Specifies that you're using PostgreSQL
  connection: {
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
  },
})

// async function getPgVersion() {
//   const result = await db.raw(`select * from posts`)
//   console.log(result.rows)
// }

// getPgVersion()

module.exports = {
  db,
}
