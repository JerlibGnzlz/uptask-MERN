export interface User {
  name: string;
  email: string;
  password: string;
  compararPassword: () => Promise<Boolean>;
}
