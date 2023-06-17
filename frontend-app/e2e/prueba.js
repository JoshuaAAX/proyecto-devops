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
    await driver.get('http://24.199.120.226:30528/');

    await driver.wait(until.titleIs('drop library'), 5000);

    // Prueba de enlace "Libros"
    const booksLink = await driver.findElements({ partialLinkText: 'Trujo' });

    if (booksLink.length > 0) {
      console.log(
        'El enlace de Libros está presente en la barra de navegación'
      );

      // Hacer clic en el enlace de Libros
      await booksLink[0].click();

      // Esperar hasta que la URL cambie a /books
      await driver.wait(until.urlContains('/books'), 5000);

      // Verificar que la URL actual sea /books
      const currentUrl = await driver.getCurrentUrl();
      if (currentUrl.includes('/books')) {
        console.log('La navegación a /books fue exitosa');
      } else {
        console.log('La navegación a /books falló');
      }
    } else {
      throw new Error('La navegación a /books falló');
    }

    // Prueba de enlace "Prestamos"
    const loansLink = await driver.findElements({
      partialLinkText: 'Prestamos',
    });

    if (loansLink.length > 0) {
      console.log(
        'El enlace de Prestamos está presente en la barra de navegación'
      );

      // Hacer clic en el enlace de Prestamos
      await loansLink[0].click();

      // Esperar hasta que la URL cambie a /loans
      await driver.wait(until.urlContains('/loans'), 5000);

      // Verificar que la URL actual sea /loans
      const currentUrl = await driver.getCurrentUrl();
      if (currentUrl.includes('/loans')) {
        console.log('La navegación a /loans fue exitosa');
      } else {
        console.log('La navegación a /loans falló');
      }
    } else {
      console.log(
        'El enlace de Prestamos no está presente en la barra de navegación'
      );
    }

    // Prueba de enlace "Usuarios"
    const usersLink = await driver.findElements({
      partialLinkText: 'Usuarios',
    });

    if (usersLink.length > 0) {
      console.log(
        'El enlace de Usuarios está presente en la barra de navegación'
      );

      // Hacer clic en el enlace de Usuarios
      await usersLink[0].click();

      // Esperar hasta que la URL cambie a /users
      await driver.wait(until.urlContains('/users'), 5000);

      // Verificar que la URL actual sea /users
      const currentUrl = await driver.getCurrentUrl();
      if (currentUrl.includes('/users')) {
        console.log('La navegación a /users fue exitosa');
      } else {
        console.log('La navegación a /users falló');
      }
    } else {
      console.log(
        'El enlace de Usuarios no está presente en la barra de navegación'
      );
    }

    // Obtener el título actual de la página
    const title = await driver.getTitle();

    // Verificar que el título sea "drop library"
    if (title === 'drop library') {
      console.log('El título es correcto: drop library');
    } else {
      console.log('El título no coincide');
    }

    await driver.quit();
  } catch (error) {
    console.error('Error en la prueba:', error);
    await driver.quit();
  }
}

runTest();
