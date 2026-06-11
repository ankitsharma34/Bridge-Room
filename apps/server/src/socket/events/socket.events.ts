export const CLIENT_EVENTS = {
  ACTIVE_ROOM_JOIN: "active_room:join",
  ACTIVE_ROOM_LEAVE: "active_room:leave",

  MESSAGE_SEND: "message:send",
};

export const SERVER_EVENTS = {
  USER_ONLINE: "user_online",
  USER_OFFLINE: "user_offline",

  ACTIVE_ROOM_JOINED: "active_room:joined",
  ACTIVE_ROOM_LEFT: "active_room:left",

  ROOM_PRESENCE_UPDATED: "room_presence:updated",

  MEMBER_JOINED_ROOM: "room:member_joined",
  MEMBER_LEFT_ROOM: "room:member_left",

  MESSAGE_RECEIVED: "message:received",

  ERROR: "error",
};
