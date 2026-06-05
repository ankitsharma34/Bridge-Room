import { io } from "socket.io-client";

console.log("Starting socket test...");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});

socket.on("connect_error", (error) => {
  console.error("Connection Error:", error.message);
});
