import mongoose, { Schema, model } from "mongoose";
import { IProyecto } from "../interfaces/proyect.interfaces";


const proyectoSchema = new Schema(
    {
        nombre: {
            type: String,
            require: true,
            trim: true,
        },
        descripcion: {
            type: String,
            require: true,
            trim: true,
        },
        fechaEntrega: {
            type: Date,
            default: Date.now()
        },
        cliente: {
            type: String,
            require: true,
            trim: true,
        },
        creador: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        colaboradores: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: false,
        versionKey: false,
    }
);




export const ProyectModel = model<IProyecto>("Proyect", proyectoSchema)
