import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class TemplatePage {
    title: ElementFinder;
    emailinput: ElementFinder;
    paisinput:ElementFinder;
    errorsText: ElementArrayFinder;

    constructor() {
        this.title = element(by.css('h4')); // obtenemos el elemento h4
        this.emailinput = element(by.css('input[name = correo]'));
        this.paisinput = element(by.cssContainingText('.pais','Cuba'));
        this.errorsText = element.all(by.css('.text-danger'));
    }
    
    navigateToTemplatePage(): Promise<unknown> { // navega a la ruta /template
        return browser.get(browser.baseUrl + 'template') as Promise<unknown>;
      }
    
    getTitleText(): Promise<string> { // obtiene el titulo de la página
      return this.title.getText() as Promise<string>;
    }

    setMail(email:string):Promise <void>{
      this.emailinput.clear();
      return this.emailinput.sendKeys(email) as Promise<void>;
    }
  /*
    clickPaisOption(): Promise<void> {
      return this.paisinput.click() as Promise<void>;
    }

    OptionPais(): Promise<boolean> {
      return this.paisinput.isSelected() as Promise<boolean>;
  } */

    getTextOfEspecificError(indice: number): Promise<string>{ // obtiene el texto de un mensaje de error especifico
      return this.errorsText.get(indice).getText() as Promise<string>;
    }  

}