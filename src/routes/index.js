const express = require('express');
const userController = require('../controllers/user-controller');
const { validateUserAuth, validateSignupAuth } = require('../middlewares/auth-request-validator');

const router = express.Router();

const quizRoute = require('./quiz');
router.use('/quiz',quizRoute);

router.get('/isAuthenticated',userController.isAuthenticated);
router.get('/isAdmin',userController.isAdmin);

router.post('/signup',validateSignupAuth,userController.signUp);
router.post('/login',validateUserAuth,userController.signIn);


module.exports = router;