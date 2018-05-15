const express = require('express');
const tokenController = require('../controllers/tokenController');
const authCheck = require('../middleware/authCheck')
const router = express.Router();

router.post('/verifyToken',authCheck, tokenController.verifyClientToken);

module.exports = router;