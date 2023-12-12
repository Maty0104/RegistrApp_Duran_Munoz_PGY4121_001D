import { Component, OnInit } from '@angular/core';
import { CrudService } from '../servicios/crud.service';
import { AuthService } from '../servicios/auth.service';
import { User } from '../interfaces/interfaces';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  role:any;
  id:any;

  usuario ={
    id: "",
    role: "",
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    password:"",
    materiauno: "",
    materiados: "",
    semestre: 0,
    anacademico: 0,
    horas: 0,
  }

  constructor(private menuController: MenuController,
              private crudservice: CrudService,
              private authService: AuthService,
              private router: Router) { 
                this.id = sessionStorage.getItem('id');
                this.role = sessionStorage.getItem('role');
              }

  ngOnInit() {}

  MostrarMenu(){
    this.menuController.open('first');
  };
  
  ionViewWillEnter(){
    this.getUsuarioById(this.getIdFromUrl());
  }
  
  getIdFromUrl(){
    let url=this.router.url;
    let arr=url.split("/",3);
    let id = parseInt(arr[2]);
    return id;
  }
  
  getUsuarioById(usuarioId:number){
    this.crudservice.BuscarUsuarioId(usuarioId).subscribe(
      (resp:any)=>{                
        this.usuario={
          id: resp[0].id,
          role: resp[0].role,
          nombre: resp[0].nombre,
          apellido: resp[0].apellido,
          username: resp[0].username,
          email: resp[0].email,
          password: resp[0].password,
          materiauno:resp[0].materiauno,
          materiados: resp[0].materiados,
          semestre: resp[0].semestre,
          anacademico:resp[0].anacademico,
          horas: resp[0].horas,
        }
      }
    )
  }
  
}
