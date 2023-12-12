import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private httpclient:HttpClient) { }

  private materias: any[] = [
    { value: 'Calidad de Software', label: 'Calidad De Software' },
    { value: 'Arquitectura En Software', label: 'Arquitectura En Software' },
    { value: 'Aplicaciones Móviles', label: 'Aplicaciones Móviles' },
    { value: 'Modelamiento Base de datos', label: 'Modelamiento Base de datos' },
    { value: 'Etica del trabajo', label: 'Etica del trabajo' }
  ];

  private roles: any[] = [
    { value: 'Estudiante', label: 'Estudiante' },
    { value: 'Profesor', label: 'Profesor' },
  ];

  getRoles(){
    return this.roles;
  }

  getMaterias() {
    return this.materias;
  }
}





