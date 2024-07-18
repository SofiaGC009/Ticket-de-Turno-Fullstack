// Importar el módulo Sequelize
const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize para conectarse a la base de datos MySQL
// Parâmetros:
// - Nombre de la base de datos ('ticket_turno')
// - Usuario de la base de datos ('root')
// - Contraseña del usuario ('' - en este caso está vacío)
// - Objeto de configuración con las opciones de conexión
const sequelize = new Sequelize('ticket_turno', 'root', '', {
  host: 'localhost', // Dirección del host donde se encuentra la base de datos
  dialect: 'mysql'   // Especifica el dialecto de SQL que se utilizará (en este caso, MySQL)
});

// Exportar la instancia de Sequelize para que pueda ser utilizada en otros archivos
module.exports = sequelize;

