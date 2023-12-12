import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

  contrasenaForm: FormGroup;

  userdata: any;


  usuario = {

    id: 0,
    username: "",
    nombre: "",
    apellido: "",
    password: "",
    email: "",
    role: ""

  }

  constructor(private authservice: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastcontroller: ToastController,
    private builder: FormBuilder){
      this.contrasenaForm = this.builder.group({
        'email' : new FormControl("", [Validators.required, Validators.minLength(4)])
      })
    }
  ngOnInit() {
  }

    login() {
      console.log("Codificando Login");
      if (this.contrasenaForm.valid) {
        this.authservice.GetUserById(this.contrasenaForm.value.email).subscribe(resp => {
          this.userdata = resp;
          console.log(this.userdata);
          if (this.userdata.length > 0) {
            this.usuario = {
              id: this.userdata[0].id,
              username: this.userdata[0].username,
              nombre: this.userdata[0].nombre,
              apellido: this.userdata[0].apellido,
              password: this.userdata[0].password,
              email: this.userdata[0].email,
              role: this.userdata[0].role
            };
    
            // Comparamos password
            if (this.usuario.email === this.contrasenaForm.value.email) {
              // Iniciamos 
              sessionStorage.setItem('id', this.usuario.id.toString());
              sessionStorage.setItem('username', this.usuario.username);
              sessionStorage.setItem('nombre', this.usuario.nombre);
              sessionStorage.setItem('apellido', this.usuario.apellido);
              sessionStorage.setItem('role', this.usuario.role);
              sessionStorage.setItem('email', this.usuario.email);
              sessionStorage.setItem('ingresado', 'true');
              this.showToast('usuario encontraado');
              this.router.navigateByUrl("/actualizarcontrasena");
            
              }else{
              this.showUserNotFoundErrorAlert();
              this.contrasenaForm.reset();
            }
          }
        }
      );
    }
  }
  async showToast(msg: any){
    const toast = await this.toastcontroller.create({ 
      message: msg,
      duration: 3000
    })
    toast.present();
  }

  async showUserNotFoundErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Email no encontrado',
      message: 'El email ingresado no existe. Ingrese un email valido.',
      buttons: ['OK']
    });
    await alert.present();
  }
}  