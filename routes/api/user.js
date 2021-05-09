const express = require("express");
const userController = require('../../controllers/userController')
const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.addUser);
router.get("/:userID", userController.getUser);
router.put("/:userID", userController.updateUser);
router.delete("/:userID", userController.deleteUser);

module.exports = router;
