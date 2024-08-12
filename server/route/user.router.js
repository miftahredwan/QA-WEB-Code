const express = require("express");
const {register, login, check} = require("../controller/user.controller")
const multer = require("multer");;
const authenticateToken=require("../api/middleware/auth")
const router = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);
router.get("/check", 
    authenticateToken, 
    check);
module.exports=router