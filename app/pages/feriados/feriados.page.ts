import { Component, OnInit } from '@angular/core';
import { ApiCrudService } from '../servicios/api-crud.service';
import { LoadingController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { fechas } from '../interfaces/interfaces';

@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.page.html',
  styleUrls: ['./feriados.page.scss'],
})
export class FeriadosPage  {

  fechas:fechas[]=[];


  constructor(private fechasService: ApiCrudService,
              private loadingCtrl : LoadingController) { }

  ionViewWillEnter(){
    this.loadFechas();
    }
    async loadFechas(event?: InfiniteScrollCustomEvent){
    
      const loading = await this.loadingCtrl.create({
        message: "Cargando..",
        spinner: "bubbles"
      });
      await loading.present();
  
  
      this.fechasService.listarFechas().subscribe(
        {
          next: resp=>{
            console.log(resp);
           loading.dismiss();
            let listString = JSON.stringify(resp)
            this.fechas=JSON.parse(listString)
            event?.target.complete();
            console.log(this.fechas);
            
          },
          error: err =>{
            console.log(err.error.message);
           loading.dismiss();
          }
        }
      )
    }
}
