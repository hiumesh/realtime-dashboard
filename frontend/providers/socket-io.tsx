"use client";

import { showErrorToast } from "@/lib/handle-error";
import { socket } from "@/lib/socket-io";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

export const SocketEvents = {};

interface SocketContextType {
  emit: (event: string, data: unknown) => void;
  emitWithAck: (event: string, data: unknown) => Promise<unknown>;
  registerEventListener: (
    event: string,
    handler: (...args: unknown[]) => void
  ) => string;
  unRegisterEventListener: (listenerId: string) => void;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export default function SocketContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const eventListenersRef = useRef(new Map());

  const emitWithAck = useCallback(async (event: string, data: unknown) => {
    return await socket.emitWithAck(event, data);
  }, []);

  const emit = useCallback((event: string, data: unknown) => {
    return socket.emit(event, data);
  }, []);

  const registerEventListener = useCallback(
    (event: string, handler: () => void) => {
      const listenerId = Date.now().toString();
      eventListenersRef.current.set(listenerId, {
        event: event,
        handler: handler,
      });

      socket.on(event, handler);
      return listenerId;
    },
    []
  );

  const unRegisterEventListener = useCallback((listenerId: string) => {
    try {
      if (eventListenersRef.current.has(listenerId)) {
        const listener = eventListenersRef.current.get(listenerId);
        socket.off(listener.event, listener.handler);
        eventListenersRef.current.delete(listenerId);
      }
    } catch (error) {
      showErrorToast(error, "Failed to unregister event listener!!");
    }
  }, []);

  useEffect(() => {
    socket.connect();

    return () => {};
  }, []);

  const value = useMemo(
    () => ({
      emit,
      emitWithAck,
      registerEventListener,
      unRegisterEventListener,
    }),
    [emit, emitWithAck, registerEventListener, unRegisterEventListener]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocketContext() {
  return useContext(SocketContext) as SocketContextType;
}
