import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`BridgeRoom Server running on http://localhost:${PORT}`);
});
