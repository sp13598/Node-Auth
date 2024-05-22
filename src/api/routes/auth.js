import express from 'express';
import { login, register, registerAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login)

// Admin Login
router.post('/register-admin', registerAdmin)

export default router;