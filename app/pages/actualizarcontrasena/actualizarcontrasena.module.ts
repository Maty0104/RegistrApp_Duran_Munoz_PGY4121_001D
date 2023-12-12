import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarcontrasenaPageRoutingModule } from './actualizarcontrasena-routing.module';

import { ActualizarcontrasenaPage } from './actualizarcontrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarcontrasenaPageRoutingModule
  ],
  declarations: [ActualizarcontrasenaPage]
})
export class ActualizarcontrasenaPageModule {}
