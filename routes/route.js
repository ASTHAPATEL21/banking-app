// routes/route.js
const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login');
const logoutController = require('../controllers/logout');
const registerController = require('../controllers/register');
const checkBalanceController = require('../controllers/checkBalance');
const depositController = require('../controllers/deposit');
const withdrawController = require('../controllers/withdraw');
const findBranchController = require('../controllers/findBranch');
const {viewTransactions} = require('../controllers/transaction');
const { findBranch } = require('../controllers/findBranch');


router.post('/login', loginController.login);
router.get('/logout', logoutController.logout);
router.post('/register', registerController.register);
router.post('/check-balance', checkBalanceController.checkBalance);
router.post('/deposit', depositController.deposit);
router.post('/withdraw', withdrawController.withdraw);
router.post('/find-branch', findBranch);
router.post('/view-transactions', viewTransactions);



module.exports = router;
