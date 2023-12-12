import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarcontrasenaPage } from './actualizarcontrasena.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarcontrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarcontrasenaPageRoutingModule {}
