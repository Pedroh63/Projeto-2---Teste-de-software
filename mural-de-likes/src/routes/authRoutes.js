const express = require('express');
const authController = require('../controllers/authController');
const { isNotAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/register', isNotAuthenticated, (req, res) => res.render('register', { error: null }));
router.post('/register', isNotAuthenticated, authController.register);

router.get('/login', isNotAuthenticated, (req, res) => res.render('login', { error: null }));
router.post('/login', isNotAuthenticated, authController.login);

router.post('/logout', authController.logout);

module.exports = router;