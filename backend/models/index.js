// Importa sequelize y la instancia de conexión
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Importa los modelos
const Nivel = require('./Nivel');
const Asunto = require('./Asunto');
const Municipio = require('./Municipio');
const Ticket = require('./Ticket');

// Relaciona los modelos
// Un ticket pertenece a un nivel, asunto y municipio
Ticket.belongsTo(Nivel, { foreignKey: 'nivel_id' });
Ticket.belongsTo(Asunto, { foreignKey: 'asunto_id' });
Ticket.belongsTo(Municipio, { foreignKey: 'municipio_id' });

// Un nivel tiene muchos tickets
Nivel.hasMany(Ticket, { foreignKey: 'nivel_id' });
// Un asunto tiene muchos tickets
Asunto.hasMany(Ticket, { foreignKey: 'asunto_id' });
// Un municipio tiene muchos tickets
Municipio.hasMany(Ticket, { foreignKey: 'municipio_id' });

// Exporta los modelos y la instancia de sequelize
module.exports = {
  sequelize,
  Nivel,
  Asunto,
  Municipio,
  Ticket
};
