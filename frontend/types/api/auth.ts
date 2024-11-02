export type AuthResponse = {
  token: string;
  tokenType: string;
  expiresAt: string;
  refreshToken: string;
  sessionId: string;
  user: {
    userId: string;
    email: string;
    role: "user" | "admin" | "manager";
  };
};
