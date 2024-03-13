import { SchemaDefinitionProperty } from "mongoose";
import { ObjectId, Schema } from "mongoose";

export interface IProyecto extends Document {
    nombre: string;
    descripcion: string;
    fechaEntrega: string;
    cliente: string;
    creador: string
    colaboradores: Array<[]>;
}
