export class UserEntity {
  id: number;
  email: string;
  name: string;
  password?: string;
  refreshToken?: string;
}
