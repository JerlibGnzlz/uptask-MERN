export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  token: string;
  confirmado: Boolean;
  compararPassword: () => string
  // passwordHash?: string | undefined
  // comprobarPassword(password: string): Promise<boolean>;
}
