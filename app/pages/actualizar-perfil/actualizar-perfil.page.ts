import { Component, OnInit } from '@angular/core';
import { CrudService } from '../servicios/crud.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-perfil',
  templateUrl: './actualizar-perfil.page.html',
  styleUrls: ['./actualizar-perfil.page.scss'],
})
export class ActualizarPerfilPage implements OnInit {

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
  
  constructor(private crudservice: CrudService,
              private router: Router,
              private alertcontroller: AlertController) { }

  ngOnInit() {
  }

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

  ActualizarUsuario(){
    this.crudservice.ActualizarUsuario(this.usuario).subscribe();
    this.mostrarMensaje();
    this.router.navigateByUrl("/home");
  }

  async mostrarMensaje(){
    const alerta = await this.alertcontroller.create({
      header: 'Usuario Actualizado ',
      message: 'Su información se ha modificado ' + this.usuario.username,
      buttons: ['OK']
    });
    alerta.present();
  }

}
