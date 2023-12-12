import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';

import { QrPage } from './qr.page';
import { QRCodeModule } from 'angularx-qrcode';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    ReactiveFormsModule,
    QrPageRoutingModule,
  ],
  declarations: [QrPage]
})
export class QrPageModule {}
