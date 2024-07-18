// Importar el modelo Asunto
const Asunto = require('../models/Asunto');

// Controlador para obtener todos los asuntos
exports.getAsuntos = async (req, res) => {
  // Buscar todos los registros de la tabla 'Asuntos'
  const asuntos = await Asunto.findAll();
  // Enviar los registros obtenidos como respuesta en formato JSON
  res.json(asuntos);
};

// Controlador para crear un nuevo asunto
exports.createAsunto = async (req, res) => {
  // Obtener el nombre del asunto desde el cuerpo de la solicitud
  const { nombre } = req.body;
  // Crear un nuevo registro en la tabla 'Asuntos' con el nombre proporcionado
  const nuevoAsunto = await Asunto.create({ nombre });
  // Enviar el nuevo registro creado como respuesta en formato JSON
  res.json(nuevoAsunto);
};

// Controlador para actualizar un asunto existente
exports.updateAsunto = async (req, res) => {
  // Obtener el ID del asunto desde los parámetros de la solicitud
  const { id } = req.params;
  // Obtener el nuevo nombre del asunto desde el cuerpo de la solicitud
  const { nombre } = req.body;
  // Actualizar el registro en la tabla 'Asuntos' con el nuevo nombre donde el ID coincida
  await Asunto.update({ nombre }, { where: { id } });
  // Enviar un mensaje de éxito como respuesta en formato JSON
  res.json({ message: 'Asunto actualizado' });
};

// Controlador para eliminar un asunto existente
exports.deleteAsunto = async (req, res) => {
  // Obtener el ID del asunto desde los parámetros de la solicitud
  const { id } = req.params;
  // Eliminar el registro de la tabla 'Asuntos' donde el ID coincida
  await Asunto.destroy({ where: { id } });
  // Enviar un mensaje de éxito como respuesta en formato JSON
  res.json({ message: 'Asunto eliminado' });
};

exports.getNextId = async (req, res) => {
  try {
    const ultimoAsunto = await Asunto.findOne({
      order: [['id', 'DESC']],
    });
    const nextId = ultimoAsunto ? ultimoAsunto.id + 1 : 1;
    res.json({ nextId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el próximo ID' });
  }
};

