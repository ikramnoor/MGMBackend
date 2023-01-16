const express = require("express");
// const upload = require("../middleware/attachmentMiddleware");
const router = express.Router();

const { authMiddle, isDeleted } = require("../middleware/auth.middleware");

const userCtrl = require("./../controllers/user.controller");
router.get("/all", authMiddle, isDeleted, userCtrl.getAll);
router.get("/", authMiddle, isDeleted, userCtrl.profile);
// router.get("/:id", authMiddle, isDeleted, userCtrl.profileById);
// router.post("/update", authMiddle, isDeleted, upload, userCtrl.updateProfile);

// router.put("/switch-role", authMiddle, isDeleted, userCtrl.changeRole);
router.post("/transferMoney", authMiddle, userCtrl.transferMoney);
router.post("/withdrawMoney", authMiddle, userCtrl.withdrawMoney);
module.exports = router;
