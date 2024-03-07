export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  token: string;
  confirmado: Boolean;
  // passwordHash?: string | undefined
  // comprobarPassword(password: string): Promise<boolean>;
}
