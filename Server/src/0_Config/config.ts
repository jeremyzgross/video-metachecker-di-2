import knex from 'knex';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import { Response } from 'express';

dotenv.config();

const generateToken = (res: Response, id: number) => {
  const token = jwt.sign({ id }, process.env.SECRET as Secret, {
    expiresIn: '30d'
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
};

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
  },
});

export { db, generateToken };