const supertest = require('supertest');
const { app, server } = require('../backend-app/index');
const api = supertest(app);
// Antes de todas las pruebas

// Pruebas de GET /authors...
test('debe retornar todos los autores', async () => {
  await api.get('/authors').expect(200);

  // expect(response.status).toEqual(200);
  // Resto del código de la prueba...
});

test('debe retornar un libro específico', async () => {
  await api.get('/authors/1').expect(200);
});
afterAll(() => {
  server.close();
});
