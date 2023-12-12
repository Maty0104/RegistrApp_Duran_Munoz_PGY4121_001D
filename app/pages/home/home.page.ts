import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menuController: MenuController) { }
  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first');
  }
  getNameFromSession() {
    return sessionStorage.getItem('nombre');
  }
  getLastNameFromSession(){
    return sessionStorage.getItem('apellido')
  }

}
