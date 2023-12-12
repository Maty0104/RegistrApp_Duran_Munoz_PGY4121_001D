import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { fechas } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiCrudService {

  constructor(private httpclient: HttpClient) { }

  listarFechas():Observable<fechas>{
    return this.httpclient.get<fechas>(`${environment.apiUrl}/fechas`);
  }

  BuscarFechaId(id:number):Observable<fechas>{
    return this.httpclient.get<fechas>(`${environment.apiUrl}/fechas/?id=${id}`);
  }

}
