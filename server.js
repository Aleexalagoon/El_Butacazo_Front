const express = require('express');
const path = require('path');
const app = express();

// Configuración de las rutas para archivos estáticos
app.use('/styles/build', express.static(path.join(__dirname, './styles/build'))); // Archivos CSS
app.use('/js', express.static(path.join(__dirname, './JS')));            // Archivos JS
app.use('/img', express.static(path.join(__dirname, './img')));
app.use('/HTML', express.static(path.join(__dirname, './HTML')));// Archivos de imágenes

// Ruta para servir páginas HTML
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, './HTML', `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {   
      console.error(`Error al cargar ${page}.html:`, err);
      res.status(404).send('Página no encontrada');
    }
  });
});

// Ruta por defecto para redirigir a index.html si no coincide otra ruta
app.get('*', (req, res, next) => {
  if (
    req.path.startsWith('/css') ||
    req.path.startsWith('/js') ||
    req.path.startsWith('/img')
  ) {
    return next();
  }
  res.sendFile(path.join(__dirname, './HTML/index.html'), (err) => {
    if (err) {
      console.error('Error al cargar index.html:', err);
      res.status(500).send('Error en el servidor');
    }
  });
});

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
