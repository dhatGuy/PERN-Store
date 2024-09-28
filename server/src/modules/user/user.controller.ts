import { Request, Response } from "express";
import { z } from "zod";
import { UserExistsError } from "~/helpers/error";
import { ApiResponse } from "~/utils/apiResponse";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response) => {
    console.log(this.userService);
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      res.status(201).json(ApiResponse.success("User created", newUser));
    } catch (error) {
      if (error instanceof UserExistsError) {
        res
          .status(400)
          .json(
            ApiResponse.fieldError("User already exists", [
              { id: error.field, error: error.message },
            ])
          );
        return;
      }
      if (error instanceof z.ZodError) {
        res.status(400).json(
          ApiResponse.fieldError(
            "Validation error",
            error.issues.map((issue) => ({
              id: issue.path.join("."),
              error: issue.message,
            }))
          )
        );
      } else {
        res.status(500).json(ApiResponse.serverError("Internal server error"));
      }
    }
  };

  getByUsername = async ({ params: { username } }: Request, res: Response) => {
    const user = await this.userService.getUserByUsername(username);
    res.status(200).json(ApiResponse.success("User found", user));
  };

  getById = async ({ params: { id } }: Request, res: Response) => {
    const user = await this.userService.getUserById(id);
    res.status(200).json(ApiResponse.success("User found", user));
  };

  getByEmail = async ({ params: { email } }: Request, res: Response) => {
    const user = await this.userService.getUserByEmail(email);
    res.status(200).json(ApiResponse.success("User found", user));
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser = await this.userService.updateUser(req.body, id);
    res.status(201).json(ApiResponse.success("User updated", updatedUser));
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedUser = await this.userService.deleteUser(id);
    res.status(200).json(ApiResponse.success("User deleted", deletedUser));
  };

  getAllUsers = async (_req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.status(200).json(ApiResponse.success("Users found", users));
  };
}
