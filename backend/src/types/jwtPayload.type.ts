export interface JwtPayload {
  userId: string;
  email: string;
}

export interface RefreshPayload {
  userId: string;
}