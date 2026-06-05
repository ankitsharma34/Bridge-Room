import { createServer } from "http";
import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { initializeSocket } from "./socket/socket.js";

const PORT = env.PORT || 5000;

// socket io setup
const server = createServer(app);
initializeSocket(server);

server.listen(PORT, () => {
  logger.info(`BridgeRoom Server running on http://localhost:${PORT}`);
});
