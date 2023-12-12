import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../pages/servicios/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private toastcontroller: ToastController
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authservice.IsLogged()) {
      this.showToast('Debe iniciar sesión');
      this.router.navigateByUrl('/inicio');
      return false;
    }

    const rolUsuario = this.authservice.GetRole();

    if (rolUsuario) {
      if (rolUsuario.toLowerCase() === 'estudiante' && (state.url.includes('/home') || state.url.includes('/escanear') || state.url.includes('/feriados') || state.url.includes('/informacion') || state.url.includes('/detalle')) || state.url.includes('/perfil') || state.url.includes('/actualizar-perfil'))  
        {
        return true;
      } else if (rolUsuario.toLowerCase() === 'profesor' && state.url.includes('/qr') || state.url.includes('/feriados') || state.url.includes('/informacion') || state.url.includes('/detalle') || state.url.includes('/perfil') || state.url.includes('/actualizar-perfil')) 
        {
        return true;
        }
    }

    this.showToast('Acceso no autorizado');
    if (rolUsuario !== null && rolUsuario !== undefined && rolUsuario.toLowerCase() === 'estudiante') {
      this.router.navigateByUrl('/home'); 
    } else if (rolUsuario !== null && rolUsuario !== undefined && rolUsuario.toLowerCase() === 'estudiante') {
      this.router.navigateByUrl('/qr'); 
    }
    return false;
  }

  async showToast(msg: any) {
    const toast = await this.toastcontroller.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
