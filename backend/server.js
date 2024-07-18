// Importar los módulos necesarios
const express = require('express');
const cors = require('cors');
const app = express();

// Habilita CORS para permitir solicitudes desde el frontend
app.use(cors());

// Habilita la lectura de JSON en el cuerpo de las solicitudes
app.use(express.json());

// Importa y usa las rutas para cada entidad
const nivelesRoutes = require('./routes/niveles');
const municipiosRoutes = require('./routes/municipios');
const asuntosRoutes = require('./routes/asuntos');
const ticketsRoutes = require('./routes/tickets');

// Asigna las rutas a los controladores correspondientes
app.use('/api/niveles', nivelesRoutes);
app.use('/api/municipios', municipiosRoutes);
app.use('/api/asuntos', asuntosRoutes);
app.use('/api/tickets', ticketsRoutes);

// Middleware para el manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Inicia el servidor en el puerto 3000 o en el puerto especificado en las variables de entorno
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
