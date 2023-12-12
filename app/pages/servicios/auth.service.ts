import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual: User | null = null;

  constructor(private httpclient: HttpClient) { }


  GetAllUsers():Observable<User>{
    return this.httpclient.get<User>(`${environment.apiUrl}/usuarios`);
  }

  
  GetUserById(codigo: any):Observable<User>{
    return this.httpclient.get<User>(`${environment.apiUrl}/usuarios/?username=${codigo}`);
  }

  IsLogged(){
    return sessionStorage.getItem(`username`)!=null;
  }

  GetRole(){
    return sessionStorage.getItem('role')
  }



  
}

  
