const supertest = require('supertest');
const { app, server } = require('../backend-app/index');
const api = supertest(app);
// Antes de todas las pruebas
// Pruebas de GET /authors...
describe('authors.router', () => {
  let id_last_author = 0;
  // Prueba para GET /books
  describe('GET /authors', () => {
    test('debe retornar todos los autores', async () => {
      const response = await api.get('/authors');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /authors/:id', () => {
    test('debe retornar un libro específico', async () => {
      const response1 = await api.get('/authors/1');
      expect(response1.status).toBe(200);

      const response2 = await api.get('/authors/-1');
      expect(response2.status).toBe(404);
      expect(response2.body).toHaveProperty('message', 'Author no found --get');
    });
  });

  describe('POST /authors', () => {
    test('debe crear un nuevo author', async () => {
      const author = {
        name_author: 'Isaac Asimov',
        nationality: 'Bogota',
      };

      const response = await api.post('/authors').send(author);

      id_last_author = response.body.id_author;
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('PUT /authors/:id', () => {
    test('debe actualizar un author específico', async () => {
      const author = {
        name_author: 'Isaac Asimov',
        nationality: 'Bogotaa',
      };

      const response = await api.put(`/authors/${id_last_author}`).send(author);

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('DELETE /authors/:id', () => {
    test('debe eliminar un author específico', async () => {
      //prueba eliminar el ultimo libro creado en la prueba
      const response1 = await api.delete(`/authors/${id_last_author}`);
      expect(response1.status).toBe(204);

      //prueba eliminar un libro inexistente
      const response2 = await api.delete(`/authors/-1`);
      expect(response2.status).toBe(404);
    });
  });
});

describe('books.router', () => {
  let id_last_book = 0;

  describe('GET /books', () => {
    test('debe retornar todos los libros', async () => {
      const response = await api.get('/books');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe('POST /books', () => {
    test('debe crear un nuevo libro', async () => {
      const book = {
        title: 'El nombre del viento',
        score: 9,
        published_date: 2022,
        id_category: 1,
        id_author: 2,
        id_editorial: 3,
      };

      const response = await api.post('/books').send(book);

      id_last_book = response.body.isbn;
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toMatchObject(book);
    });
  });

  describe('GET /books/:id', () => {
    test('debe retornar un libro específico', async () => {
      const requiredProperties = [
        'title',
        'score',
        'published_date',
        'id_category',
        'id_author',
        'id_editorial',
      ];

      //prueba obtener un libro de un id
      const response1 = await api.get(`/books/${id_last_book}`);
      expect(response1.status).toBe(200);
      expect(response1.headers['content-type']).toMatch(/application\/json/);
      expect(response1.body).toBeInstanceOf(Object);
      expect(response1.body).toHaveProperty(...requiredProperties);

      //prueba obtener un mensaje de libro no encontrado al pasar un libro inexistente
      const response2 = await api.get('/books/-1');
      expect(response2.status).toBe(404);
      expect(response2.body).toHaveProperty('message', 'Book no found--get');
    });
  });

  describe('PUT /books/:id', () => {
    test('debe actualizar un autor específico', async () => {
      const book = {
        title: 'test prueba',
        score: 9,
        published_date: 2022,
        id_category: 1,
        id_author: 2,
        id_editorial: 3,
      };

      const response = await api.put(`/books/${id_last_book}`).send(book);

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toMatchObject(book);
    });
  });
  describe('DELETE /books/:isbn', () => {
    it('debe eliminar un usuario específico', async () => {
      //prueba eliminar el ultimo libro creado en la prueba
      const response1 = await api.delete(`/books/${id_last_book}`);
      expect(response1.status).toBe(204);

      //prueba eliminar un usuario inexistente
      const response2 = await api.delete(`/books/-1`);
      expect(response2.status).toBe(404);
    });
  });

  describe('DELETE /authors/:id', () => {
    it('debe eliminar un libro específico', async () => {
      //prueba eliminar el ultimo libro creado en la prueba
      const response1 = await api.delete(`/books/${id_last_book}`);
      // expect(response1.status).toBe(204);

      //prueba eliminar un libro inexistente
      const response2 = await api.delete(`/books/-1`);
      expect(response2.status).toBe(404);
    });
  });
});

describe('categories.router', () => {
  // Prueba para GET /books
  describe('GET /categories', () => {
    test('debe retornar todos las categorias', async () => {
      const response = await api.get('/categories');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /categories/:id', () => {
    test('debe retornar un categories específico', async () => {
      const response1 = await api.get('/categories/1');
      expect(response1.status).toBe(200);

      const response2 = await api.get('/categories/-1');
      expect(response2.status).toBe(404);
      expect(response2.body).toHaveProperty(
        'message',
        'Category no found--get'
      );
    });
  });

  describe('POST /categories', () => {
    test('debe crear una nueva categoria', async () => {
      const category = {
        name_category: 'triller',
      };

      const response = await api.post('/categories').send(category);

      id_last_category = response.body.id_category;
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('PUT /categories/:id', () => {
    test('debe actualizar una categoria específica', async () => {
      const category = {
        name_category: 'comedy',
      };
      const response = await api
        .put(`/categories/${id_last_category}`)
        .send(category);

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toBeInstanceOf(Object);
      // expect(response.body).toMatchObject(author);
    });
  });
  describe('DELETE /categories/:id', () => {
    test('debe eliminar una categoria específica', async () => {
      //prueba eliminar el ultimo libro creado en la prueba
      const response1 = await api.delete(`/categories/${id_last_category}`);
      expect(response1.status).toBe(204);

      //prueba eliminar un libro inexistente
      const response2 = await api.delete(`/categories/-1`);
      expect(response2.status).toBe(404);
    });
  });
});

describe('editorial.router', () => {
  // Prueba para GET /books
  describe('GET /editorials', () => {
    test('debe retornar todas las editoriales', async () => {
      const response = await api.get('/editorials');
      expect(response.status).toBe(200);
    });
  });
  describe('GET /editorials/:id', () => {
    test('debe retornar una editorial específica', async () => {
      const response1 = await api.get('/editorials/1');
      expect(response1.status).toBe(200);

      const response2 = await api.get('/editorials/-1');
      expect(response2.status).toBe(404);
      expect(response2.body).toHaveProperty(
        'message',
        'Editorial no found --get'
      );
    });
  });
  describe('POST /editorials', () => {
    test('debe crear una nueva editorial', async () => {
      const editorial = { name_editorial: 'norma' };

      const response = await api.post('/editorials').send(editorial);

      id_last_editorial = response.body.id_editorial;
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('PUT /editorials/:id', () => {
    test('debe actualizar una editorial específica', async () => {
      const editorial = {
        name_editorial: 'norma2',
      };

      const response = await api
        .put(`/editorials/${id_last_editorial}`)
        .send(editorial);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('DELETE /editorial/:id', () => {
    test('debe eliminar una editorial específica', async () => {
      //prueba eliminar el ultimo libro creado en la prueba
      //const response1 = await api.delete(`/editorial/${id_last_category}`);
      //expect(response1.status).toBe(204);

      //prueba eliminar un libro inexistente
      const response2 = await api.delete(`/editorial/-1`);
      expect(response2.status).toBe(404);
    });
  });
});

describe('loans.router', () => {
  // Prueba para GET /books
  let id_last_loan = 0;
  describe('GET /loans', () => {
    test('debe retornar todos los prestamos', async () => {
      const response = await api.get('/loans');
      expect(response.status).toBe(200);
    });
  });
  describe('POST /loans', () => {
    test('debe crear un nuevo prestamo', async () => {
      const loan = {
        loan_date: null,
        devolution_date: null,
        id_user: null,
        isbn: 144,
        delivered: null,
      };

      const response = await api.post('/loans').send(loan);

      id_last_loan = response.body.id_loan;
      console.log(id_last_loan);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('PUT /loans/:id', () => {
    test('debe actualizar un prestamo específico', async () => {
      const loan = {
        loan_date: null,
        devolution_date: null,
        id_user: null,
        isbn: 144,
        delivered: null,
      };
    });
  });
});

describe('users.router', () => {
  // Prueba para GET /books
  describe('GET /users', () => {
    test('debe retornar todos los usuarios', async () => {
      const response = await api.get('/users');
      expect(response.status).toBe(200);
    });
  });

  describe('POST /users', () => {
    test('debe crear una nuevo usuario', async () => {
      const user = {
        full_name: 'Laura Moyano Gonzalez',
        cellphone: '3451236478',
        address: 'av 2a # 34-78',
        roles: 'writer',
        email: 'lau.write@gmail.com',
        password: 'writeislove',
      };

      const response = await api.post('/users').send(user);

      id_last_user = response.body.id_user;
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('GET /users/:id', () => {
    test('debe retornar un usuario específico', async () => {
      const response1 = await api.get(`/users/${id_last_user}`);
      expect(response1.status).toBe(200);

      const response2 = await api.get('/users/-1');
      expect(response2.status).toBe(404);
      expect(response2.body).toHaveProperty('message', 'User no found --get');
    });
  });

  describe('PUT /users/:id', () => {
    test('debe actualizar un usuario específico', async () => {
      const user = {
        full_name: 'Laura Moyano',
        cellphone: '3451236479',
        address: 'av 2a # 34-78',
        roles: 'writer',
        email: 'lau.write@gmail.com',
        password: 'writeislove',
      };
      const response = await api.put(`/users/${id_last_user}`).send(user);
    });
  });

  describe('DELETE /users/:id', () => {
    it('debe eliminar un usuario específico', async () => {
      //prueba eliminar el ultimo libro creado en la prueba
      const response1 = await api.delete(`/users/${id_last_user}`);
      // expect(response1.status).toBe(204);

      //prueba eliminar un usuario inexistente
      const response2 = await api.delete(`/users/-1`);
      expect(response2.status).toBe(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('debe eliminar un usuario específico', async () => {
      //prueba eliminar el ultimo libro creado en la prueba
      const response1 = await api.delete(`/users/${id_last_user}`);
      // expect(response1.status).toBe(204);

      //prueba eliminar un usuario inexistente
      const response2 = await api.delete(`/users/-1`);
      expect(response2.status).toBe(404);
    });
  });
});

afterAll(() => {
  server.close();
});
