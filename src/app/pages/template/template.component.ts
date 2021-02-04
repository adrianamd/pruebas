import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Jordan',
    apellido: 'Cruz',
    correo: 'jordan@gmail.com',
    pais: 'MEX',
    genero: 'M'
  };

  paises: any [] = [];

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {
    this.paisService.getPais()
    .subscribe( paises => {
      this.paises = paises;
      this.paises.unshift({
        nombre: '[Seleccione]',
        codigo: ''
      });
      // console.log( this.paises );
    });
  }

  guardar( forma: NgForm ){
    console.log( forma );
    if ( forma.invalid ) {
      Object.values( forma.controls ).forEach( control => {
        control.markAsTouched();
      } );
      return;
    }
    console.log( forma.value );
  }

}
