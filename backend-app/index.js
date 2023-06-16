//dependencias del proyecto
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

//rutas requeridas
const bookRoutes = require('./routes/books.routes');
const categoryRoutes = require('./routes/categories.routes');
const editorialRoutes = require('./routes/editorials.routes');
const authorRoutes = require('./routes/authors.routes');
const userRoutes = require('./routes/users.routes');
const loanRoutes = require('./routes/loans.routes');

//instanciar express
const app = express();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//inicializar la rutas
app.use(bookRoutes);
app.use(categoryRoutes);
app.use(editorialRoutes);
app.use(authorRoutes);
app.use(userRoutes);
app.use(loanRoutes);

//Sirve la aplicación de React desde la carpeta frontend-app
const reactAppPath = path.join(__dirname, '../frontend-app', 'dist');
app.use(express.static(reactAppPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(reactAppPath, 'index.html'));
});

//manejador de errores
app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

//asignar valor de puerto
const PORT = 7000;
const server = app.listen(PORT, () => {
  console.log('Server running on port');
});

module.exports = { app, server };

