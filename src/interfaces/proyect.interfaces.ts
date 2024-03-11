export interface IProyecto {
    nombre: string;
    descripcion: string;
    fechaEntrega: string;
    cliente: string;
    creador: Boolean;
    colaboradores: Array<[]>;
}
