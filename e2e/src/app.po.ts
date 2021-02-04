import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class ReactivePage { // clase de la página formularios reactive

  title: ElementFinder;
  nameinput: ElementFinder;
  apellidoinput: ElementFinder;
  correoinput:ElementFinder;
  userinput:ElementFinder;
  pass1input:ElementFinder;
  pass2input:ElementFinder;
  locinput: ElementFinder;
  paisinput: ElementFinder;
  saveButton: ElementFinder;
  addButton: ElementFinder;
  deleteButton: ElementArrayFinder;
  errorsText: ElementArrayFinder;

  constructor() {
    this.title = element(by.css('h4')); // obtenemos el elemento h4
    this.nameinput = element(by.css('input[formControlName=nombre]')); // obtenemos en input por formControlName
    this.saveButton = element(by.className('btn-outline-primary')); // obtenemos el elemento por el nombre de la clase
    this.apellidoinput = element(by.css('input[formControlName=apellido]')); // obtenemos en input por formControlName
    this.correoinput = element(by.css('input[formControlName=correo]')); // obtenemos en input por formControlName
    this.userinput = element(by.css('input[formControlName=usuario]')); // obtenemos en input por formControlName
    this.pass1input = element(by.css('input[formControlName=pass1]')); // obtenemos en input por formControlName
    this.pass2input = element(by.css('input[formControlName=pass2]')); // obtenemos en input por formControlName
    this.locinput = element(by.css('input[formControlName=estado]')); // obtenemos en input por formControlName
    this.paisinput = element(by.css('input[formControlName=municipio]')); // obtenemos en input por formControlName
    this.addButton = element(by.className('btn-success'));
    this.deleteButton = element.all(by.className('btn-danger'));
    this.errorsText = element.all(by.css('.text-danger')); // obtenemos todos los elementos con la clase text-danger
  }

  navigateToReactivePage(): Promise<unknown> { // navega a la ruta /reactive
    return browser.get(browser.baseUrl + 'reactive') as Promise<unknown>;
  }

  getTitleText(): Promise<string> { // obtiene el titulo de la página
    return this.title.getText() as Promise<string>;
  }

  setName(name: string): Promise<void>{ // escribe  el input name
    this.nameinput.clear();
    return this.nameinput.sendKeys(name) as Promise<void>;
  }

  getName(): Promise<string>{ // regresa el texto del input name
    return this.nameinput.getAttribute('value') as Promise<string>;
  }

  setApellido(apellidoo:string): Promise<void>{
    this.apellidoinput.clear();
    return this.apellidoinput.sendKeys(apellidoo) as Promise<void>;
  }

  getApellido():Promise<string>{
    return this.apellidoinput.getAttribute('value') as Promise<string>;
  }

  setMail(email:string): Promise<void>{
    this.correoinput.clear();
    return this.correoinput.sendKeys(email) as Promise<void>;
  }

  getMail():Promise<string>{
    return this.correoinput.getAttribute('value') as Promise<string>;
  }

  setUser(usuarioo:string): Promise<void>{
    this.userinput.clear();
    return this.userinput.sendKeys(usuarioo) as Promise<void>;
  }

  getUser():Promise<string>{
    return this.userinput.getAttribute('value') as Promise<string>;
  }
 
  setPass(pass:string): Promise<void>{
    this.pass1input.clear();
    return this.pass1input.sendKeys(pass) as Promise<void>;
  }

  getPass():Promise<string>{
    return this.pass1input.getAttribute('value') as Promise<string>;
  }

  setPass2(pass:string): Promise<void>{
    this.pass2input.clear();
    return this.pass2input.sendKeys(pass) as Promise<void>;
  }

  getPass2():Promise<string>{
    return this.pass2input.getAttribute('value') as Promise<string>;
  }

  setLocalidad(local:string): Promise<void>{
    this.locinput.clear();
    return this.locinput.sendKeys(local) as Promise<void>
  }

  getLocalidad():Promise <string>{
    return this.locinput.getAttribute('value') as Promise<string>;
  }

  setPais(pais:string): Promise<void>{
    this.paisinput.clear();
    return this.paisinput.sendKeys(pais) as Promise<void>
  }

  getPais():Promise <string>{
    return this.paisinput.getAttribute('value') as Promise<string>;
  }

  clickSaveButton(): Promise<void>{ // presiona el botón guardar informacion 
    return this.saveButton.click() as Promise<void>;
  }

  clickAddButton(): Promise<void>{ // presiona el botón añadir a hobbies 
    return this.addButton.click() as Promise<void>;
  }

  clickDeleteButton(): Promise<void>{  //presiona el boton eliminar 
    return this.deleteButton.click() as Promise<void>
  }

  getTextOfEspecificError(indice: number): Promise<string>{ // obtiene el texto de un mensaje de error especifico
    return this.errorsText.get(indice).getText() as Promise<string>;
  }
}

