const express = require("express");

const router = express.Router();
const mission = require("./mission");
const message = require("./message");

// const user = require('./users')
// const mission =require('./mission')
// const message =require('./message')
// const login = require('./users')

// router.post('/users', user);
// router.use('/mission', mission);
// router.use('/message', message);

// router.use('/', login)
router.use("/mission", mission);
router.use("/message", message);
router.use("/", require("./test"));
module.exports = router;
