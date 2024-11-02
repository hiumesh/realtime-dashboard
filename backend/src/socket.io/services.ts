import { io } from "./index";
import { getUserPersonalRoomName } from "./util";

export function emitToRoom(room: string, event: string, data: any) {
  io.to(room).emit(event, data);
}

export function emitToUser(userId: string, event: string, data: any) {
  const room = getUserPersonalRoomName(userId);
  io.to(room).emit(event, data);
}

export function emitNewNotificationToUser(userId: string, data: any) {
  emitToUser(userId, "new-notification", data);
}

export function broadcastEvent(event: string, data: any) {
  io.emit(event, data);
}

export function broadcastDatabaseChanges(data: any) {
  io.emit("database-events", data);
}
