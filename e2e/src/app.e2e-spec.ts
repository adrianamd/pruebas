import { ReactivePage } from './app.po';
import { browser, logging} from 'protractor';
import { protractor } from 'protractor/built/ptor';

const origFn = browser.driver.controlFlow().execute;
// esta función pone un retrazo de tiempo entre cada paso del controlFlow de protractor
browser.driver.controlFlow().execute = function stop() {
  const args = arguments;

  origFn.call(browser.driver.controlFlow(), () => {
    return protractor.promise.delayed(0); // tiempo de retraso entre cada paso
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};
// puede correr la prueba con el comando ng e2e en la carpeta del proyecto, si necesita cambiar el puerto escriba ademas --port=PORTNUMBER
describe('Casos de ejemplo de Reactive', () => { // Engloba todas las pruebas (it) de un caso de uso a probar
  let page: ReactivePage;

  beforeEach(() => { // Este método se ejecuta antes de cada prueba
    page = new ReactivePage(); // crea un objeto de la página reactive forms
  });

  // si ponemos xit o xdescribe jasmine ignorara la prueba o el conjunto de pruebas
  it('Debe poder ir a la pagina de reactive forms', () => { // primera prueba de ejemplo
    page.navigateToReactivePage();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'reactive'); // comprobamos que carge la página
  });

  it('Debe mostrar el título de la página', async () => {
    page.navigateToReactivePage();
    const title = await page.getTitleText();
    await console.log(title); // podemos imprimir el texto en consola para debuggin
    expect(title).toEqual('Formularios Reactivos'); // comprobamos que el titulo renderizado sea el que esperamos
  });

  /* esto es para que llene todos los campos al mismo tiempo 
  it('Debe llenar el formulario correctamente', () =>{
    page.navigateToReactivePage();
    page.setName('Jorge');
    expect(page.getName()).toEqual('Jorge');
    page.setApellido('Molina');
    expect(page.getApellido()).toEqual('Molina');
    page.setMail('jorge@hotmail.com');
    expect(page.getMail()).toEqual('jorge@hotmail.com');
    page.setUser('jorgito');
    expect(page.getUser()).toEqual('jorgito');
    page.setPass('12345');
    expect(page.getPass()).toEqual('12345');
    page.setPass2('12345');
    expect(page.getPass2()).toEqual('12345');
    page.setLocalidad('Xochimilco');
    expect(page.getLocalidad()).toEqual('Xochimilco');
    page.setPais('Mexico');
    expect(page.getPais()).toEqual('Mexico');

    page.clickSaveButton();
  });  */
  
  it('Debe escribir Jorge en el campo nombre', async () => { // en este ejemplo podemos quitar el método waitForAngular y los await
    page.navigateToReactivePage();                           // pero los dejo por que me parece mas ilustrativo para futuras prácticas
    await browser.waitForAngular(); // espera que angular este estable (termine de cargar la página)
    await page.setName('Jorge');
    expect(page.getName()).toEqual('Jorge'); // comprobamos que el input tenga el valor que le acabamos de escribir
  });

  it('Debe llenar el campo Apellido correctamente', async() => {
    page.navigateToReactivePage();
    await page.setApellido('Morales');
    expect(page.getApellido()).toEqual('Morales');
  });

  it('Debe llenar correo electronico correctamente', async() =>{
    page.navigateToReactivePage();
    await page.setMail('jorge@hotmail.com');
    expect(page.getMail()).toEqual('jorge@hotmail.com');
  });

  it('Debe llenar el usuario correctamente', async() =>{
    page.navigateToReactivePage();
    await page.setUser('jorgito');
    expect(page.getUser()).toEqual('jorgito');
  });

  it('Debe llenar la contraseña correctamente', async() =>{  //llena las dos contraseñas 
    page.navigateToReactivePage();
    page.setPass('12345');
    expect(page.getPass()).toEqual('12345');

    page.setPass2('12345');
    expect(page.getPass2()).toEqual('12345');
  });


  it('Debe llenar la Direccion correctamente', async() =>{
    page.navigateToReactivePage();
    await page.setLocalidad('Xochimilco');
    expect(page.getLocalidad()).toEqual('Xochimilco');
    
    await page.setPais('Mexico');
    expect(page.getPais()).toEqual('Mexico');

  });

  it('Debe mostrar un error en el campo apellido si presionamos guardar', () => {
    page.navigateToReactivePage();
    page.clickSaveButton();
    expect(page.getTextOfEspecificError(0)).toEqual('Apellido obligatorio :O'); // esperamos que aparezca el error
  });

  it('Debe mostrar un error si el campo nombre tiene menos 4 letras', () => {
    page.navigateToReactivePage();
    page.setName('Jorg');
    page.clickSaveButton();
    expect(page.getTextOfEspecificError(0)).toEqual('Ingresa al menos 5 letras :)'); // esperamos que aparezca el error
  });
  
  it('Debe mostrar error en el correo electronico si el formato no es correcto', () =>{
    page.navigateToReactivePage();
    var namesArray1 = ['jorge', 'jorge@' , 'jorge@ho']
        for (var i = 0; i < 3; i++) {
          page.setMail(namesArray1[i]);
        }
        expect(page.getTextOfEspecificError(0)).toEqual('Correo obligatorio');
  });
  
  it('Debe mostrar error en la contraseña si no coinciden', () =>{
    page.navigateToReactivePage();
    var pass1 = 'bla';
    page.setPass(pass1);
    expect(page.getPass()).toEqual(pass1);

    var pass2 = 'blabla';
    page.setPass2(pass2);
    expect(page.getPass2()).toEqual(pass2);
    
    expect(pass1).not.toBe(pass2);
        
  });

  it('Debe agregar un elemento a la tabla hobbies si presionamos Agregar', async () => {
    page.navigateToReactivePage();
    await page.clickAddButton();
  });

  it('Debe eliminar un elemento de la tabla hobbies si presionamos Eliminar',async()=>{
    page.navigateToReactivePage();
    await page.clickDeleteButton();
  });
  

  // ******* EJERCICIOS PARA PRACTICAR ************
  // 1. llenar todos los campos del formulario reactivo correctamente, presionar el botón guardar y verificar que se
  // limpian todos los campos del formulario ---listo!
  // 2. Probar que el botón de borrar hobbie funciona ---- listo!
  // 3. Crear el arreglo ['jorge', 'jorge@' , 'jorge@ho'] hacer una prueba que escriba cada uno de los
  // string del arreglo en el campo correo y verificar que el mensaje de error aparezca en la pantalla  ----listo
  // (Se debe utilizar un for para no repetir el código por cada string en el arreglo)
  // 4. Crear 2 archivos uno para la clase formulario template y otro para el describe de las pruebas de esa página
  // (el archivo debe terminar con extención .e2e-spec.ts), recuerden hacer un método en la clase formulario template
  // que se dirija a dicha página del proyecto con la instrucción browser.get(browser.baseUrl + 'template')
  // realizar la prueba del ejercicio 3 para ese formulario
  // 5. Probar la selección de un checkbox, para ello, seleccionar Cuba del checkbox Pais,
  // sugerencia utilice la instruccion cssContainingText
  // 6. Finalmente pruebe retrasos de tiempo jugando con el tiempo en la instrucción protractor.promise.delayed(tiempo);

  // EJERCICIO SUGERIDO
  // Consulte las pruebas del tutorial en la página de protractor https://www.protractortest.org/#/tutorial
  // (si puede realice las pruebas del tutorial en un archivo de este proyecto ignorando las partes del archivo de configuración
  // porque este proyecto ya cuenta con las configuraciones necesarias)

  afterEach(async () => { // Este método se ejecuta despues de cada prueba
    // Revisa si no hay errores severos emitidos por el navegador
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

