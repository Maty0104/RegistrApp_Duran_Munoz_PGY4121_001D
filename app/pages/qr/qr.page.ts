import { Component, OnInit } from '@angular/core';
import { CrudService } from '../servicios/crud.service';
import { IAsistencia } from '../interfaces/interfaces';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MateriasService } from '../servicios/materias.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  providers: [DatePipe],
})
export class QrPage implements OnInit {
  qrForm: FormGroup;

  public mensaje: string = '';

  data = {
    texto: '',
  };

  newAsistencia: IAsistencia = {
    nombre: '',
    apellido: '',
    asistencia: '',
    materia: '',
  };
  materias: any[];
  nombre: any;

  constructor(
    private builder: FormBuilder,
    private crud: CrudService,
    private router: Router,
    private alert: AlertController,
    private datePipe: DatePipe,
    private menuController: MenuController,
    private materiasservice: MateriasService
  ) {
    this.qrForm = this.builder.group({
      materia: new FormControl('', [Validators.required]),
    });
    this.nombre = sessionStorage.getItem('username');
    this.materias = this.materiasservice.getMaterias();
  }

  ngOnInit() {}

  MostrarMenu() {
    this.menuController.open('first');
  }

  generarQr() {
    const fechaActual = new Date();
    const fechaFormateada = this.datePipe.transform(fechaActual, 'dd/MM/yyyy');
    const materiaControl = this.qrForm.get('materia');

    if (materiaControl !== null) {
      const materiaSeleccionada = materiaControl.value;

      this.newAsistencia.nombre = this.getNameFromSession();
      this.newAsistencia.apellido = this.getLastNameFromSession();
      this.newAsistencia.materia = materiaSeleccionada;

      this.newAsistencia.asistencia = `Se ha realizado exitosamente su registro de asistencia del "${fechaFormateada}" para la asignatura "${this.newAsistencia.materia}" ${this.data.texto}`;

      this.crud.CrearAsisten(this.newAsistencia).subscribe();

      this.mostrarMensaje();
      this.mensaje = this.newAsistencia.asistencia;
      this.data.texto = '';
    }
  }

  async mostrarMensaje() {
    const alerta = await this.alert.create({
      header: 'QR generado con éxito',
      message: 'Su QR ha sido almacenado',
      buttons: ['Ok'],
    });
    alerta.present();
  }

  getNameFromSession() {
    const nombre = sessionStorage.getItem('nombre');
    return nombre ? nombre.charAt(0).toUpperCase() + nombre.slice(1) : '';
  }

  getLastNameFromSession() {
    const apellido = sessionStorage.getItem('apellido');
    return apellido ? apellido.charAt(0).toUpperCase() + apellido.slice(1) : '';
  }
}
