const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { getCurrentUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Registro y login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Info del usuario autenticado
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
