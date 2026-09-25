# API Reference

## Auth Module (`/auth`)

| Method | Endpoint    | Description                                  | Protected |
| ------ | ----------- | -------------------------------------------- | --------- |
| POST   | `/register` | Registers a new user.                        | No        |
| POST   | `/login`    | Authenticates user & issues JWTs.            | No        |
| POST   | `/refresh`  | Issues a new access token via refresh token. | No        |
| POST   | `/logout`   | Invalidates current session.                 | No        |
| GET    | `/me`       | Returns current authenticated user profile.  | Yes       |

## Room Module (`/room`)

| Method | Endpoint                     | Description                          | Protected |
| ------ | ---------------------------- | ------------------------------------ | --------- |
| POST   | `/create`                    | Creates a new room.                  | Yes       |
| POST   | `/join`                      | Joins a room (usually via code).     | Yes       |
| POST   | `/leave`                     | Leaves a room.                       | Yes       |
| GET    | `/my-rooms`                  | Lists rooms the user is a member of. | Yes       |
| GET    | `/:roomId`                   | Gets details for a specific room.    | Yes       |
| GET    | `/:roomId/members`           | Gets the member list of a room.      | Yes       |
| PATCH  | `/:roomId`                   | Updates room details.                | Yes       |
| DELETE | `/:roomId`                   | Deletes a room (owner only).         | Yes       |
| DELETE | `/:roomId/members/:memberId` | Removes a member from a room.        | Yes       |

## Message Module (`/message`)

| Method | Endpoint              | Description                           | Protected |
| ------ | --------------------- | ------------------------------------- | --------- |
| GET    | `/rooms/:roomId`      | Retrieves message history for a room. | Yes       |
| POST   | `/rooms/:roomId/read` | Marks a room's messages as read.      | Yes       |
| PATCH  | `/:messageId`         | Edits an existing message.            | Yes       |
| DELETE | `/:messageId`         | Deletes a message.                    | Yes       |
