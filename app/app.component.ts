import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

interface Componente{
  name: string;
  icon: string;
  redirecTo: string;
  action?: () => void; 
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  id:any;

  
  constructor(private router: Router,
              private toastcontroller: ToastController,
              ) {this.id = sessionStorage.getItem('id');
            }

  componentes : Componente[]=[
    {
      name:'Informacion',
      icon: 'information-circle-outline',
      redirecTo:'/informacion'
    },
    {
      name:'Feriados',
      icon: 'calendar-number-outline',
      redirecTo:'/feriados'
    },
    {
      name:'Cerrar sesion',
      icon: 'exit-outline',
      redirecTo:'/',
      action: this.logout.bind(this)
    }


  ]

  logout() {
    console.log("Cerrando sesión");
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('ingresado');
    sessionStorage.removeItem('apellido');
    sessionStorage.removeItem('nombre');

    this.showToast('Cerró Sesion');
    
    this.router.navigateByUrl("/"); 

}

    async showToast(msg: any){
      const toast = await this.toastcontroller.create({ 
        message: msg,
        duration: 3000
      })
      toast.present();
    }


}

