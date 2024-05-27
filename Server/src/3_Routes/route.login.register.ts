import express from 'express';
import { registerUser, loginUser } from '../2_Controllers/controller.login.register.js';
export const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)

