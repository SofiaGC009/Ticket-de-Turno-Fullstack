// Importar el modelo Municipio
const Municipio = require('../models/Municipio');

// Controlador para obtener todos los municipios
exports.getMunicipios = async (req, res) => {
  // Buscar todos los registros de la tabla 'Municipios'
  const municipios = await Municipio.findAll();
  // Enviar los registros obtenidos como respuesta en formato JSON
  res.json(municipios);
};

// Controlador para crear un nuevo municipio
exports.createMunicipio = async (req, res) => {
  // Obtener el nombre del municipio desde el cuerpo de la solicitud
  const { nombre } = req.body;
  // Crear un nuevo registro en la tabla 'Municipios' con el nombre proporcionado
  const nuevoMunicipio = await Municipio.create({ nombre });
  // Enviar el nuevo registro creado como respuesta en formato JSON
  res.json(nuevoMunicipio);
};

// Controlador para actualizar un municipio existente
exports.updateMunicipio = async (req, res) => {
  // Obtener el ID del municipio desde los parámetros de la solicitud
  const { id } = req.params;
  // Obtener el nuevo nombre del municipio desde el cuerpo de la solicitud
  const { nombre } = req.body;
  // Actualizar el registro en la tabla 'Municipios' con el nuevo nombre donde el ID coincida
  await Municipio.update({ nombre }, { where: { id } });
  // Enviar un mensaje de éxito como respuesta en formato JSON
  res.json({ message: 'Municipio actualizado' });
};

// Controlador para eliminar un municipio existente
exports.deleteMunicipio = async (req, res) => {
  // Obtener el ID del municipio desde los parámetros de la solicitud
  const { id } = req.params;
  // Eliminar el registro de la tabla 'Municipios' donde el ID coincida
  await Municipio.destroy({ where: { id } });
  // Enviar un mensaje de éxito como respuesta en formato JSON
  res.json({ message: 'Municipio eliminado' });
};
