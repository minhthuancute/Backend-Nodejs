const express = require("express");
const {
  getBooks,
  createBooks,
  deleteBooks,
  getBooksDetail,
  updateBooks,
} = require("../controllers/bookControler");
const { authorize } = require("../middlewares/authorize");
const { jwtAuth } = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/", getBooks);
router.get("/:id", jwtAuth, getBooksDetail);
router.post("/", jwtAuth, createBooks);

// only for admin
router.delete("/:id", jwtAuth, authorize("admin"), deleteBooks);
router.patch("/:id", jwtAuth, updateBooks);

module.exports = router;
