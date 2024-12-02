const express = require('express');
const path = require('path');
const app = express();

// Configuración de las rutas para archivos estáticos
app.use('/css', express.static(path.join(__dirname, '../HTML/css')));
app.use('/js', express.static(path.join(__dirname, '../HTML/js')));
app.use('/images', express.static(path.join(__dirname, '../HTML/img')));

// Ruta para manejar páginas HTML
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, '../HTML', `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error al cargar ${page}.html:`, err);
      res.status(404).send('Página no encontrada');
    }
  });
});

// Ruta por defecto (home.html)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/css') || req.path.startsWith('/js') || req.path.startsWith('/images')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../HTML/index.html'), (err) => {
    if (err) {
      console.error('Error al cargar index.html:', err);
      res.status(500).send('Error en el servidor');
    }
  });
});

// Configurar el puerto y arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
