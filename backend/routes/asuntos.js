// Importa el módulo express
const express = require('express');
// Crea un enrutador con express
const router = express.Router();
// Importa los controladores para los asuntos
const { getAsuntos, createAsunto, updateAsunto, deleteAsunto, getNextId } = require('../controllers/asuntosController');

// Define la ruta para obtener todos los asuntos
router.get('/', getAsuntos);

// Define la ruta para crear un nuevo asunto
router.post('/', createAsunto);

// Define la ruta para actualizar un asunto existente por su id
router.put('/:id', updateAsunto);

// Define la ruta para eliminar un asunto por su id
router.delete('/:id', deleteAsunto);

// Define la ruta para obtener el próximo ID disponible
router.get('/next-id', getNextId);

// Exporta el enrutador para que pueda ser usado en otros archivos
module.exports = router;

