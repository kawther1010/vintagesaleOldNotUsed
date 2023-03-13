const express = require('express');
const router = express.Router();

const authpage = require('../controlers/authpage')

router.post('/login', authpage.postlogin);
router.post('/register', authpage.postregister);

module.exports = router;
