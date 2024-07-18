// Importar la instancia de Sequelize configurada
const sequelize = require('./config/database');

// Importar los modelos
const Nivel = require('./models/Nivel');
const Asunto = require('./models/Asunto');
const Municipio = require('./models/Municipio');
const Ticket = require('./models/Ticket');

// Sincronizar los modelos con la base de datos
// Esto crea las tablas en la base de datos si no existen, 
// y actualiza la estructura de las tablas si los modelos han cambiado
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!'); // Mensaje de confirmación si la sincronización es exitosa
  })
  .catch(err => {
    // Imprimir un mensaje de error y cerrar el proceso si hay un error durante la sincronización
    console.error('Unable to create tables, shutting down...', err);
    process.exit(1);
  });

