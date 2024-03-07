import { hash, compare } from "bcrypt";


// ─── Encriptar Password ──────────────────────────────────────────────────────


export const encryptPassword = async (password: string): Promise<string> => {
    return await hash(password, 8);
};

// ─── Comparar Password ───────────────────────────────────────────────────────

export const isCorrectPass = async (password: string, passwordHashado: string) => {
    return await compare(password, passwordHashado);
};