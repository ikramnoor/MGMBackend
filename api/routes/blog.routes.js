const express = require("express");
const router = express.Router();

const { authMiddle, isDeleted } = require("../middleware/auth.middleware");
const blogCtrl = require("../controllers/withdraw.controller");
// const {} = require("../middleware/uploadImage.middleware");

// router.get("/mine", authMiddle, isDeleted, blogCtrl.getMyBlogs);
router.get("/all", authMiddle, isDeleted, blogCtrl.getAllBlogs);
// router.get("/:id", authMiddle, isDeleted, blogCtrl.getBlogById);
router.post("/post", authMiddle, isDeleted, blogCtrl.postBlog);
router.post("/feedback", blogCtrl.postFeedback);

module.exports = router;
