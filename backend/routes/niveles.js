// Importa el módulo express
const express = require('express');
// Crea un enrutador con express
const router = express.Router();
// Importa los controladores para los niveles
const { getNiveles, createNivel, updateNivel, deleteNivel } = require('../controllers/nivelesController');

// Define la ruta para obtener todos los niveles
router.get('/', getNiveles);

// Define la ruta para crear un nuevo nivel
router.post('/', createNivel);

// Define la ruta para actualizar un nivel existente por su id
router.put('/:id', updateNivel);

// Define la ruta para eliminar un nivel por su id
router.delete('/:id', deleteNivel);

// Exporta el enrutador para que pueda ser usado en otros archivos
module.exports = router;
