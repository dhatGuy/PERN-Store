import pino from "pino";
import PinoHttp from "pino-http";

export const logger = pino({
  name: "PERN-Store",
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty" }
      : undefined,
});

export const httpLogger = PinoHttp({
  logger,
  // serializers: {
  //   req: (req) =>
  //     process.env.NODE_ENV === "development"
  //       ? `${req.method} ${req.url} - ${req.ip ?? "-"} - ${req.query ?? "-"} - ${req.body ?? "-"}`
  //       : req,

  //   res: (res) =>
  //     process.env.NODE_ENV === "development"
  //       ? `${res.responseTime}ms - ${res.statusCode} ${res["content-length"]}`
  //       : res,
  // },
});
