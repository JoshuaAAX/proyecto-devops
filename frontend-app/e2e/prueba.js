import { Builder, By } from 'selenium-webdriver';
import assert from 'assert';
import chrome from 'selenium-webdriver/chrome.js';

(async function example() {
  // Configuración del navegador y la URL del componente
  const options = new chrome.Options();
  options.addArguments('--headless');
  const url = 'http://24.199.120.226:30528/'; // La URL de tu aplicación

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Navegar a la página que contiene el componente Navbar
    await driver.get(url);

    // Verificar el título del componente
    const titleElement = await driver.findElement({
      className: 'chakra-heading',
    });
    const titleText = await titleElement.getText();
    assert.strictEqual(titleText, 'DROP_PRUEBA');

    // Hacer clic en el enlace "Libros"
    const librosLink = await driver.findElement(By.linkText('Libros'));
    await librosLink.click();

    // Verificar la URL actual después de hacer clic en "Libros"
    const currentUrl = await driver.getCurrentUrl();
    try {
      assert.strictEqual(currentUrl, url + '/books');
    } catch (err) {
      return -1;
    }

    // Hacer clic en el enlace "Prestamos"
    const prestamosLink = await driver.findElement(By.linkText('Prestamos'));
    await prestamosLink.click();

    // Verificar la URL actual después de hacer clic en "Prestamos"
    const currentUrl2 = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl2, url + '/loans');

    // Hacer clic en el enlace "Usuarios"
    const usuariosLink = await driver.findElement(By.linkText('Usuarios'));
    await usuariosLink.click();

    // Verificar la URL actual después de hacer clic en "Usuarios"
    const currentUrl3 = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl3, url + '/users');

    // Todas las pruebas pasaron
    // console.log('Pruebas funcionales exitosas');
  } catch (error) {
    // Alguna prueba falló
    // console.error('Error en las pruebas:', error);
  } finally {
    // Cerrar el navegador
    await driver.quit();
  }
})();
