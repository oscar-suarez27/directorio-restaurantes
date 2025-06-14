const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Priorizar variables de entorno de Heroku
app.use(express.static(path.join(__dirname, 'build')));

// Manejar todas las rutas de la SPA
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
