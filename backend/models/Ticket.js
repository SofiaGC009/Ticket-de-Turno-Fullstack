const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Nivel = require('./Nivel');
const Asunto = require('./Asunto');
const Municipio = require('./Municipio');

const Ticket = sequelize.define('Ticket', {
  nombreCompleto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  curp: {
    type: DataTypes.STRING(18),
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  celular: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  turno: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pendiente', 'Resuelto'),
    allowNull: false
  },
  nivel_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Nivel,
      key: 'id'
    }
  },
  municipio_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Municipio,
      key: 'id'
    }
  },
  asunto_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Asunto,
      key: 'id'
    }
  }
}, {
  tableName: 'Tickets',
  timestamps: false
});

Ticket.belongsTo(Nivel, { foreignKey: 'nivel_id' });
Ticket.belongsTo(Asunto, { foreignKey: 'asunto_id' });
Ticket.belongsTo(Municipio, { foreignKey: 'municipio_id' });

module.exports = Ticket;
