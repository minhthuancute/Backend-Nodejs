const express = require("express");
const { getUser } = require("../controllers/userControler");

const route = express.Router();

route.post("/", getUser);

module.exports = route;
