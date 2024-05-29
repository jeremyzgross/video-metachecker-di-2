import express from 'express';
import { registerUser, loginUser } from '../2_Controllers/controller.login.register.js';
export const router_login_register = express.Router()


router_login_register.post('/register', registerUser)
router_login_register.post('/login', loginUser)

