const {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
} = require("../controllers/users.controller");
const router = require('express').Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.route("/").get(verifyAdmin, getAllUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
