export interface SignUpResponseInterface {
  status: string;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
  };
}
