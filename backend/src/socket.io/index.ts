import { getRedisClient } from "@/redis";
import type { Server } from "node:http";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import { ExtendedError, Socket, Server as SocketIOServer } from "socket.io";
import { getUserPersonalRoomName } from "./util";
import { parse } from "cookie";
import { verifyToken } from "@/api/utils/token";

export let io: SocketIOServer;

async function authMiddleware(
  ws: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  try {
    const request = ws.handshake;
    if (!request.headers.cookie) throw new Error("Cookie Not Found!");
    const cookies = parse(request.headers.cookie);
    if (!cookies) throw new Error("Cookie Not Found!");
    const { access_token } = cookies;
    if (!access_token) throw new Error("Access Token Not Found!");
    const payload = verifyToken(access_token);
    ws.data.user = { ...payload, user_id: payload.sub };
    next();
  } catch (error) {
    console.log(error);
    next(new Error(`Unauthorized! - ${(error as Error)?.message}`));
  }
}

async function handleNewConnection(ws: Socket) {
  try {
    console.log("a user connected");
    await ws.join(getUserPersonalRoomName(ws.data.user.user_id));
    ws.on("disconnect", (reason) => {
      console.log(reason);
    });
  } catch (error) {
    console.log(error);
    ws.write(`HTTP/1.1 401 Unauthorized\r\n ${(error as Error)?.message}\r\n`);
    ws.disconnect();
  }
}

export async function initSocketServer(server: Server) {
  const redisClient = await getRedisClient();
  io = new SocketIOServer(server, {
    adapter: createAdapter(redisClient),
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  });
  io.use(authMiddleware);
  io.on("connection", handleNewConnection);
}
