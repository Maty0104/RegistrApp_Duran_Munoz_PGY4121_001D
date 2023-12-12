import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, IAsistencias, IAsistencia } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpclient:HttpClient) { }

  CrearUsuario(newUser:User):Observable<User>{
    return this.httpclient.post<User>(`${environment.apiUrl}/usuarios`, newUser)
  }

  CrearAsisten(newAsistencia: IAsistencia): Observable<IAsistencia>{
    return this.httpclient.post<IAsistencias>(`${environment.apiUrl}/asistencias`, newAsistencia);
  }
  BuscarUsuarioId(id:number):Observable<User>{
    return this.httpclient.get<User>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }
  ActualizarUsuario(usuario:any):Observable<User>{
    return this.httpclient.put<User>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario);
  }


}
