// Importar el modelo Ticket
const Ticket = require('../models/Ticket');
const Municipio = require('../models/Municipio');
const Asunto = require('../models/Asunto');
const Nivel = require('../models/Nivel');

// Controlador para obtener todos los tickets
exports.getTickets = async (req, res) => {
  // Buscar todos los registros de la tabla 'Tickets'
  const tickets = await Ticket.findAll({
    include: [
      { model: Municipio, attributes: ['nombre'] },
      { model: Asunto, attributes: ['nombre'] },
      { model: Nivel, attributes: ['nombre'] }
    ]
  });
  // Enviar los registros obtenidos como respuesta en formato JSON
  res.json(tickets);
};

// Controlador para crear un nuevo ticket
exports.createTicket = async (req, res) => {
  // Obtener los datos del ticket desde el cuerpo de la solicitud
  const { nombreCompleto, curp, telefono, celular, correo, nivel_id, municipio_id, asunto_id, turno, status } = req.body;
  // Crear un nuevo registro en la tabla 'Tickets' con los datos proporcionados
  const nuevoTicket = await Ticket.create({ nombreCompleto, curp, telefono, celular, correo, nivel_id, municipio_id, asunto_id, turno, status });
  // Enviar el nuevo registro creado como respuesta en formato JSON
  res.json(nuevoTicket);
};

// Controlador para actualizar un ticket existente
exports.updateTicket = async (req, res) => {
  // Obtener el ID del ticket desde los parámetros de la solicitud
  const { id } = req.params;
  // Obtener los nuevos datos del ticket desde el cuerpo de la solicitud
  const { nombreCompleto, curp, telefono, celular, correo, nivel_id, municipio_id, asunto_id, turno, status } = req.body;
  // Actualizar el registro en la tabla 'Tickets' con los nuevos datos donde el ID coincida
  await Ticket.update({ nombreCompleto, curp, telefono, celular, correo, nivel_id, municipio_id, asunto_id, turno, status }, { where: { id } });
  // Enviar un mensaje de éxito como respuesta en formato JSON
  res.json({ message: 'Ticket actualizado' });
};

// Controlador para eliminar un ticket existente
exports.deleteTicket = async (req, res) => {
  // Obtener el ID del ticket desde los parámetros de la solicitud
  const { id } = req.params;
  // Eliminar el registro de la tabla 'Tickets' donde el ID coincida
  await Ticket.destroy({ where: { id } });
  // Enviar un mensaje de éxito como respuesta en formato JSON
  res.json({ message: 'Ticket eliminado' });
};
