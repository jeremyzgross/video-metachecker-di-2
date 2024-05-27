import knex from 'knex';
import dotenv from 'dotenv';

// dotenv.config();
dotenv.config()



const db = knex({
  client: 'pg', // Specifies that you're using PostgreSQL
  connection: {
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
  },
});

export { db };
