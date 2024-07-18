// Importar el tipo de datos DataTypes de Sequelize y la instancia de Sequelize configurada
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo Asunto
// Este modelo representa la tabla 'asuntos' en la base de datos
const Asunto = sequelize.define('Asunto', {
  // Definir el campo 'nombre' de la tabla 'asuntos'
  nombre: {
    type: DataTypes.STRING, // Tipo de dato: cadena de caracteres
    allowNull: false, // No permite valores nulos
    unique: true // Garantiza que el valor en este campo sea único en la tabla
  }
}, {
  timestamps: false, // Desactivar la creación automática de los campos 'createdAt' y 'updatedAt'
  tableName: 'asuntos' // Especificar el nombre de la tabla en la base de datos
});

// Exportar el modelo Asunto para su uso en otras partes de la aplicación
module.exports = Asunto;

