import { io } from "socket.io-client";

console.log("Starting socket test...");

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbXBvZW1kcTgwMDAwbTBqZTRvbXJqdnRiIiwiaWF0IjoxNzgwODQ2MzUxLCJleHAiOjE3ODA4NDcyNTF9.yqOaHj_Z4dm_M7U2X3p9JitbWJTmtVdp3eueEq1h0Xk";

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
