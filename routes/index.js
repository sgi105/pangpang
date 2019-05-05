const express = require("express");

const router = express.Router();

const user = require("./users");
const mission = require("./mission");
const message = require("./message");
const test = require("./test");

// router.use('/users', user);
router.use("/mission", mission);
router.use("/message", message);
router.use("/test", test);

module.exports = router;
