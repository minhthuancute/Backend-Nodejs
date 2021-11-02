const express = require("express");
const { getFile } = require("../controllers/fileControler");
const route = express.Router();

route.get("/:filename", getFile);
module.exports = route;
