const express = require('express')

const router = express.Router()

// const user = require('./users')
// const mission =require('./mission')
// const message =require('./message')
// const login = require('./users')

// router.post('/users', user);
// router.use('/mission', mission);
// router.use('/message', message);

// router.use('/', login)
router.use('/',require('./test.js'))
module.exports = router