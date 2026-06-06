import { io } from "socket.io-client";

console.log("Starting socket test...");

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbXBvZW1kcTgwMDAwbTBqZTRvbXJqdnRiIiwiaWF0IjoxNzgwNzY5NDc4LCJleHAiOjE3ODA3NzAzNzh9.Sun2DQCsG87W-xjY0VOcy6W1cKw7YX_-8ZFK469fBl4";

const socket = io("http://localhost:5000", {
  auth: {
    token: ACCESS_TOKEN,
  },
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});

socket.on("connect_error", (error) => {
  console.error("Connection Error:", error.message);
});
