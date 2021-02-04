import { TemplatePage } from './template.po';
import { browser, element, logging,by} from 'protractor';
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
describe('Casos de ejemplo de Template', () => { // Engloba todas las pruebas (it) de un caso de uso a probar
  let page: TemplatePage;

  beforeEach(() => { // Este método se ejecuta antes de cada prueba
    page = new TemplatePage(); // crea un objeto de la página reactive forms
  });

  // si ponemos xit o xdescribe jasmine ignorara la prueba o el conjunto de pruebas
  it('Debe poder ir a la pagina de template forms', () => { // primera prueba de ejemplo
    page.navigateToTemplatePage();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'template'); // comprobamos que carge la página
  });

  it('Debe mostrar el título de la página', async () => {
    page.navigateToTemplatePage();
    const title = await page.getTitleText();
    await console.log(title); // podemos imprimir el texto en consola para debuggin
    expect(title).toEqual('Formularios Template'); // comprobamos que el titulo renderizado sea el que esperamos
  });

  it('Debe mostrar error en el correo electronico si el formato no es correcto', () =>{
    page.navigateToTemplatePage();
    var namesArray1 = ['jorge', 'jorge@' , 'jorge@ho']
        for (var i = 0; i < 3; i++) {
          page.setMail(namesArray1[i]);
        }
        expect(page.getTextOfEspecificError(0)).toEqual('E-mail obligatorio');
  });

 /* it('Debe Seleccionar Cuba en Pais',()=>{ 
    page.navigateToTemplatePage();
    page.clickPaisOption();
    expect(page.OptionPais).toBeTruthy();
  });  */

  afterEach(async () => { // Este método se ejecuta despues de cada prueba
    // Revisa si no hay errores severos emitidos por el navegador
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});  