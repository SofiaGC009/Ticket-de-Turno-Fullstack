// Importar el tipo de datos DataTypes de Sequelize y la instancia de Sequelize configurada
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo Nivel
// Este modelo representa la tabla 'niveles' en la base de datos
const Nivel = sequelize.define('Nivel', {
  // Definir el campo 'nombre' de la tabla 'niveles'
  nombre: {
    type: DataTypes.STRING, // Tipo de dato: cadena de caracteres
    allowNull: false // No permite valores nulos
  }
}, {
  tableName: 'niveles', // Especificar el nombre de la tabla en la base de datos
  timestamps: false // Desactivar la creación automática de los campos 'createdAt' y 'updatedAt'
});

// Exportar el modelo Nivel para su uso en otras partes de la aplicación
module.exports = Nivel;
