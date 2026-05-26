import { pinoHttp } from "pino-http";
import { logger } from "../lib/logger.js";

export const loggerMiddleware = pinoHttp({
  logger,

  customSuccessMessage(req, res) {
    return `${req.method} ${req.url} -> ${res.statusCode}`;
  },

  serializers: {
    req() {
      return undefined;
    },

    res() {
      return undefined;
    },
  },
});
