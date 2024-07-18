// Importar el modelo Nivel
const Nivel = require('../models/Nivel');

// Controlador para obtener todos los niveles
exports.getNiveles = async (req, res) => {
  // Buscar todos los registros de la tabla 'Niveles'
  const niveles = await Nivel.findAll();
  // Enviar los registros obtenidos como respuesta en formato JSON
  res.json(niveles);
};

// Controlador para crear un nuevo nivel
exports.createNivel = async (req, res) => {
  // Obtener el nombre del nivel desde el cuerpo de la solicitud
  const { nombre } = req.body;
  // Crear un nuevo registro en la tabla 'Niveles' con el nombre proporcionado
  const nuevoNivel = await Nivel.create({ nombre });
  // Enviar el nuevo registro creado como respuesta en formato JSON
  res.json(nuevoNivel);
};

// Controlador para actualizar un nivel existente
exports.updateNivel = async (req, res) => {
  // Obtener el ID del nivel desde los parámetros de la solicitud
  const { id } = req.params;
  // Obtener el nuevo nombre del nivel desde el cuerpo de la solicitud
  const { nombre } = req.body;
  // Actualizar el registro en la tabla 'Niveles' con el nuevo nombre donde el ID coincida
  await Nivel.update({ nombre }, { where: { id } });
  // Enviar un mensaje de éxito como respuesta en formato JSON
  res.json({ message: 'Nivel actualizado' });
};

// Controlador para eliminar un nivel existente
exports.deleteNivel = async (req, res) => {
  // Obtener el ID del nivel desde los parámetros de la solicitud
  const { id } = req.params;
  // Eliminar el registro de la tabla 'Niveles' donde el ID coincida
  await Nivel.destroy({ where: { id } });
  // Enviar un mensaje de éxito como respuesta en formato JSON
  res.json({ message: 'Nivel eliminado' });
};
