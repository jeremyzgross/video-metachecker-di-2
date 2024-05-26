import express from 'express';
import { registerUser } from '../2_Controllers/controller.login.register.js';
export const router = express.Router()


router.post('/register', registerUser)

