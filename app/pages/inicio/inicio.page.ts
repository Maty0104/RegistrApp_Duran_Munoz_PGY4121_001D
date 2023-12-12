import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  loginForm: FormGroup;

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
                this.loginForm = this.builder.group({
                  'username' : new FormControl("", [Validators.required, Validators.minLength(4)]),
                  'password' : new FormControl("", [Validators.required, Validators.minLength(4)])
                })
              }

  ngOnInit() {
  }

  login() {
    console.log("Codificando Login");
    if (this.loginForm.valid) {
      this.authservice.GetUserById(this.loginForm.value.username).subscribe(resp => {
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
          if (this.usuario.password === this.loginForm.value.password) {
            // Iniciamos 
            sessionStorage.setItem('id', this.usuario.id.toString());
            sessionStorage.setItem('username', this.usuario.username);
            sessionStorage.setItem('nombre', this.usuario.nombre);
            sessionStorage.setItem('apellido', this.usuario.apellido);
            sessionStorage.setItem('role', this.usuario.role);
            sessionStorage.setItem('ingresado', 'true');
  
            // Redirigir según el role
            if (this.usuario.role.toLowerCase() === 'estudiante') {
              this.showToast('Sesión Iniciada');
              this.router.navigateByUrl("/home");
            } else if (this.usuario.role.toLowerCase() === 'profesor') {
              console.log('Usuario es Profesor');
              this.showToast('Sesión Iniciada');
              this.router.navigateByUrl("/qr");
            }
            
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

}