export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  token: string;
  confirmado: Boolean;
  usuario: Object;
  // passwordHash?: string | undefined
  // comprobarPassword(password: string): Promise<boolean>;
}
