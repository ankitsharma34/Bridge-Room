"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Socket } from "socket.io-client";
import { useAuthStore } from "@/store/auth.store";
import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from "@/services/socket";

export type SocketStatus = "disconnected" | "connecting" | "connected";

interface SocketContextValue {
  socket: Socket;
  status: SocketStatus;
  error: string | null;
}

const SocketContext = createContext<SocketContextValue | null>(null);

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "A realtime connection error occurred.";
};

export function SocketProvider({ children }: { children: ReactNode }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [status, setStatus] = useState<SocketStatus>("disconnected");
  const [error, setError] = useState<string | null>(null);
  const activeSocket = getSocket();

  useEffect(() => {
    if (!accessToken) {
      disconnectSocket();
      setStatus("disconnected");
      setError(null);
      return;
    }

    const handleConnect = () => {
      setStatus("connected");
      setError(null);
    };
    const handleDisconnect = () => {
      setStatus("disconnected");
    };
    const handleConnectError = (connectionError: Error) => {
      setStatus("disconnected");
      setError(connectionError.message);
    };
    const handleServerError = (serverError: unknown) => {
      setError(getErrorMessage(serverError));
    };

    activeSocket.on("connect", handleConnect);
    activeSocket.on("disconnect", handleDisconnect);
    activeSocket.on("connect_error", handleConnectError);
    activeSocket.on("error", handleServerError);

    // Disconnect first so a refreshed access token is used for a new
    // authenticated handshake rather than only updating local auth state.
    disconnectSocket();
    setStatus("connecting");
    connectSocket(accessToken);

    return () => {
      activeSocket.off("connect", handleConnect);
      activeSocket.off("disconnect", handleDisconnect);
      activeSocket.off("connect_error", handleConnectError);
      activeSocket.off("error", handleServerError);
      disconnectSocket();
    };
  }, [accessToken, activeSocket]);

  return (
    <SocketContext.Provider value={{ socket: activeSocket, status, error }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};
