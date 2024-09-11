import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import "express-async-errors";
import morgan from "morgan";
// import routes from "./routes";
import compression from "compression";
import helmet from "helmet";
import { httpLogger } from "utils/logger";
// import unknownEndpoint from "./middleware/unKnownEndpoint";
// import { handleError } from "./helpers/error";

const app = express();

app.set("trust proxy", 1);
app.use(httpLogger);
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cookieParser());

// app.use("/api", routes);

app.get("/", (req: Request, res: Response) =>
  res.send("<h1 style='text-align: center'>E-COMMERCE API</h1>")
);
// app.use(unknownEndpoint);
// app.use(handleError);

export default app;
