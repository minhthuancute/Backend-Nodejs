const express = require("express");
const {
  createCategory,
  getCategory,
} = require("../controllers/categoryControler");

const router = express.Router();

router.get("/", getCategory);
router.post("/", createCategory);

module.exports = router;
