import { io, type Socket } from "socket.io-client";
import { socketServerUrl } from "@/lib/env/client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(socketServerUrl, {
      autoConnect: false,
    });
  }

  return socket;
};

export const connectSocket = (accessToken: string): Socket => {
  const activeSocket = getSocket();

  activeSocket.auth = { token: accessToken };

  if (!activeSocket.connected) {
    activeSocket.connect();
  }

  return activeSocket;
};

export const disconnectSocket = () => {
  if (socket?.connected || socket?.active) {
    socket.disconnect();
  }
};
