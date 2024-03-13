import { Schema, model } from "mongoose";


const taskSchema = new Schema(
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
        estado: {
            type: Boolean,
            default: false
        },
        fechaEntrega: {
            type: Date,
            required: true,
            default: Date.now()

        },
        prioridad: {
            type: String,
            required: true,
            enum: [ "Baja", "Media", "Alta" ]
        },
        proyecto: {
            type: Schema.Types.ObjectId,
            ref: "Proyect"
        }
    },
    {
        timestamps: false,
        versionKey: false,
    }
);


export const TaskModel = model("Tarea", taskSchema)
