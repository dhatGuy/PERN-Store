import express from "express";
import validateRequest from "~/middlewares/validateSchema";
import { UserController } from "./user.controller";
import { createUserSchema } from "./user.schema";
const router = express.Router();
const userController = new UserController();

router
  .route("/")
  .post(validateRequest(createUserSchema), userController.createUser)
  .get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.get("/email/:email", userController.getByEmail);
router.get("/username/:username", userController.getByUsername);

export default router;
