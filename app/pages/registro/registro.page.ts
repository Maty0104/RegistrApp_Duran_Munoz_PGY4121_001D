import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { User } from '../interfaces/interfaces';
import { CrudService } from '../servicios/crud.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ControlContainer, AbstractControl } from '@angular/forms';
import { MateriasService } from '../servicios/materias.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  newUser: User = {
    username: '',
    nombre: '',
    apellido: '',
    password: '',
    email: '',
    anacademico: '',
    semestre: '',
    materiauno: '',
    materiados: '',
    role: '',
  };

  materias: any[];
  roles: any[];

  registrationForm: FormGroup;

  handlerMessage = '';
  roleMessage = '';

  constructor(private alertController: AlertController, 
              private crud: CrudService,
              private materiasservice: MateriasService,
              private router: Router,
              private toastcontroller: ToastController,
              private formBuilder: FormBuilder
  ) {
      this.materias = this.materiasservice.getMaterias();
      this.roles = this.materiasservice.getRoles();
      this.registrationForm = this.formBuilder.group({
        'username': new FormControl("", [Validators.required, Validators.minLength(4)]),
        'nombre': new FormControl("", [Validators.required]),
        'apellido': new FormControl("", [Validators.required]),
        'password': new FormControl("", [Validators.required, Validators.minLength(4)]),
        'email': new FormControl("", [Validators.email]),
        'anacademico': new FormControl("", [Validators.required, Validators.minLength(4),
                                            (control: AbstractControl)=>{
                                              const value = control.value;
                                              if (!/^[0-9]*$/.test(value)) {
                                                return { CaracterInvalid: true }; //Valida que solo se puedan ingresar numeros.
                                              }
                                              if (parseInt(value) < 2020) {
                                                return { FueraRango : true }; //Valida que este sobre el año 2020 en adelante.
                                              }
                                              return null;
                                            }]),
        'semestre': new FormControl("", [Validators.required,Validators.maxLength(2), Validators.pattern(/^(0[4-9]|1[0-6])$/),
                                        (control: AbstractControl)=>{
                                          const value = control.value;
                                            if (parseInt(value) < 4 || parseInt(value) > 16) { //sirve par que solo se puedan ingresar semestres dento de esos rangos.
                                              return { RangoError: true };
                                            }
                                            return null;
                                        }]),      
        'materiauno': new FormControl("",[Validators.required]),
        'materiados': new FormControl("",[Validators.required]),
        'role': new FormControl("", [Validators.required])
});
}
  ngOnInit() {
  }

  crearUsuario() {
    if (this.registrationForm.valid) {
      this.newUser = this.registrationForm.value;
      this.crud.CrearUsuario(this.newUser).subscribe(() => {
        this.router.navigateByUrl("/inicio");
        this.showToast('Registro Exitoso ');

      });
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
