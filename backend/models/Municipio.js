// Importar el tipo de datos DataTypes de Sequelize y la instancia de Sequelize configurada
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo Municipio
// Este modelo representa la tabla 'municipios' en la base de datos
const Municipio = sequelize.define('Municipio', {
  // Definir el campo 'nombre' de la tabla 'municipios'
  nombre: {
    type: DataTypes.STRING, // Tipo de dato: cadena de caracteres
    allowNull: false // No permite valores nulos
  }
}, {
  timestamps: false, // Desactivar la creación automática de los campos 'createdAt' y 'updatedAt'
  tableName: 'municipios' // Especificar el nombre de la tabla en la base de datos
});

// Exportar el modelo Municipio para su uso en otras partes de la aplicación
module.exports = Municipio;
