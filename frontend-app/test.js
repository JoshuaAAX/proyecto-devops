import { Builder, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function runTest() {
  const options = new chrome.Options();
  // Opciones adicionales
  // options.addArguments('--headless');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Acceder a localhost:7000
    await driver.get('http://localhost:7000');

    // Esperar hasta que el título de la página sea visible
    await driver.wait(until.titleIs('drop library'), 5000);

    // Obtener el título actual de la página
    const title = await driver.getTitle();

    // Verificar que el título sea "drop library"
    if (title === 'drop library') {
      console.log('El título es correcto: drop library');
    } else {
      console.log('El título no coincide');
    }

    // Cerrar el navegador
    await driver.quit();
  } catch (error) {
    console.error('Error en la prueba:', error);
    // Cerrar el navegador en caso de error
    await driver.quit();
  }
}

runTest();
