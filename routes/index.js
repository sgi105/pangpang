const express = require('express')

const router = express.Router()

const user = require('./users')
const mission =require('./mission')
const message =require('./message')

router.use('/users', user);
router.use('/mission', mission);
router.use('/message', message);
module.exports = router