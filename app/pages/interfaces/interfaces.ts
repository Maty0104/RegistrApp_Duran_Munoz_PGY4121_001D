export interface User{

    username:string;
    nombre: String;
    apellido: String;
    password: string;
    email: string;
    anacademico: string,
    semestre: string,
    materiauno: string;
    materiados: string;
    role: string;

}

export interface fechas{
    id: number;
    fechnombre: String;
    fechainic:number;
    fechaterm:number;
    fechsemestre: String;
    fechdescripcion:String;
}

export interface fecha{
    fechnombre: String;
    fechainic:number;
    fechaterm:number;
    fechsemestre: String;
    fechdescripcion:String;
}

//get, put, delete
export interface IAsistencias{
    nombre: string;
    apellido: string;
    asistencia: string;
    materia: string;
    id: number;
}
//post
export interface IAsistencia{
    nombre: string;
    apellido: string;
    asistencia: string;
    materia: string;
}