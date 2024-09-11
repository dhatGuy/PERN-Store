import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { logger } from "utils/logger";
import app from "./app";

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => logger.info(`Magic happening on port: ${PORT}`));
