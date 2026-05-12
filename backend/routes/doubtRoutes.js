const express = require("express");

const router = express.Router();

const multer = require("multer");

const {
  askDoubt
} = require("../controllers/doubtController");


// MULTER STORAGE
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  }
});

const upload = multer({
  storage
});


// ROUTE
router.post(
  "/ask",
  upload.single("image"),
  askDoubt
);

module.exports = router;