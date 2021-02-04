import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder,
               private valida: ValidadoresService) {
    this.crearFormulario();
    this.crearListeners();
    this.cargarData();
   }

  ngOnInit(): void {
  }
  get hobb(){
    return this.forma.get('hobb') as FormArray;
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }
  get estadoNoValido(){
    return this.forma.get('direccion.estado').invalid && this.forma.get('direccion.estado').touched;
  }
  get municipioNoValido(){
    return this.forma.get('direccion.municipio').invalid && this.forma.get('direccion.municipio').touched;
  }
  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }
  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return ( pass1 === pass2 ) ? false : true;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre   : [ '', [ Validators.required, Validators.minLength(5) ] ],
      apellido : [ '', [ Validators.required, this.valida.validacion1 ] ],
      correo   : [ '', [ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required ]],
      pass1    : [ '', [ Validators.required ] ],
      usuario  : [ '', , this.valida.existeUsuario ],
      pass2    : [ '', [ Validators.required ] ],
      direccion: this.fb.group({
        estado   : [ '', Validators.required ],
        municipio: [ '', Validators.required ]
      }),
      hobb: this.fb.array([])
    }, {
      validators: this.valida.passIgual('pass1', 'pass2')
    });
  }
  crearListeners(){
    // this.forma.valueChanges.subscribe( valor => {
    //   console.log( valor );
    // });
    // this.forma.statusChanges.subscribe( status => console.log({ status } ));
    this.forma.get('nombre').valueChanges.subscribe( console.log );
  }
  cargarData(){
    // this.forma.setValue( {
    this.forma.reset({
        nombre: 'Alvin',
        apellido: 'Kamara',
        correo: 'ak41goat@try.com',
        pass1: '123',
        pass2: '123',
        direccion: {
          estado: 'Louisiana',
          municipio: 'New Orleans'
        }
      }
    );
  }
  agregarHobb(){
    this.hobb.push( this.fb.control( '' ) );
  }
  borrarHobb( i: number ){
    this.hobb.removeAt( i );
  }
  guardar(){
    console.log( this.forma );
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {
        if ( control instanceof FormGroup){
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      } );
    }
    this.forma.reset();
  }

}
