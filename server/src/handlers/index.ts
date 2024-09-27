import { Application } from "express";
import productRouter from "./product";

export const mountRoutes = (app: Application) => {
  app.use("/products", productRouter);
};
