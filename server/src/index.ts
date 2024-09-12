import http from "http";
import { logger } from "~/utils/logger";
import app from "./app";
import env from "./env";

const server = http.createServer(app);

const PORT = env.PORT || 8080;

server.listen(PORT, () => logger.info(`Magic happening on port: ${PORT}`));
