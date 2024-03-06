export interface User {
  name: string;
  email: string;
  password: string;
  token: string;
  confirmado: Boolean;
  compararPassword: () => Promise<Boolean>;
}
