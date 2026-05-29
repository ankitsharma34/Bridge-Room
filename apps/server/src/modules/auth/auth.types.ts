export type RegisterUserInput = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export type RefreshTokenPayload = {
  token: string;
  userId: string;
};
