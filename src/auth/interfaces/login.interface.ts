export interface LoginResponseInterface {
  status: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenInterface {
  status: string;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface UserPayloadInterface {
  sub: number;
  name: string;
  email: string;
}
