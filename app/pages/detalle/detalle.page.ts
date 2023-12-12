import { Component, OnInit } from '@angular/core';
import { ApiCrudService } from '../servicios/api-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  fecha ={
    id:0,
    fechnombre:"" ,
    fechainic: "",
    fechaterm:"",
    fechsemestre:"" ,
    fechdescripcion:""
  }


  constructor(private apiCrud: ApiCrudService,
              private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.getFechaByID(this.getIdFromUrl());
  }

  getIdFromUrl(){
    let url=this.router.url;
    let arr=url.split("/",3);
    let id =parseInt(arr[2]);
    return id;
  }

  getFechaByID(fechaID:number){
    this.apiCrud.BuscarFechaId(fechaID).subscribe(
      (resp:any)=>{
        this.fecha={
          id: resp[0].id,
          fechnombre: resp[0].fechnombre,
          fechainic: resp[0].fechainic,
          fechaterm: resp[0].fechaterm,
          fechsemestre: resp[0].fechsemestre,
          fechdescripcion: resp[0].fechdescripcion
        }
      }
    )
  }

}
