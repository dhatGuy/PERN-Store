import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import "express-async-errors";
import morgan from "morgan";
// import routes from "./routes";
import compression from "compression";
import helmet from "helmet";
import { handleError } from "~/helpers/error";
import unknownEndpoint from "~/middlewares/unKnownEndpoint";
import authRouter from "./modules/auth/auth.route";
import cartRouter from "./modules/cart/cart.route";
import orderRouter from "./modules/order/order.route";
import paymentRouter from "./modules/payment/payment.route";
import productRouter from "./modules/product/product.route";
import userRouter from "./modules/user/user.route";

const app = express();

app.set("trust proxy", 1);
// app.use(httpLogger);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req: Request, res: Response) =>
  res.send("<h1 style='text-align: center'>E-COMMERCE API</h1>")
);
app.use(unknownEndpoint);
app.use(handleError);

export default app;
