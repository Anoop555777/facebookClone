const express = require('express');
const authController = require('./../controller/authController');
const router = express.Router();
router.post('/signup', authController.signIn);
router.get('/verified', authController.verified);
router.post('/login', authController.login);
router.get('/verify', authController.getVerify);
module.exports = router;
