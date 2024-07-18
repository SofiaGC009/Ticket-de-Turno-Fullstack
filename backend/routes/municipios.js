// Importa el módulo express
const express = require('express');
// Crea un enrutador con express
const router = express.Router();
// Importa los controladores para los municipios
const { getMunicipios, createMunicipio, updateMunicipio, deleteMunicipio } = require('../controllers/municipiosController');

// Define la ruta para obtener todos los municipios
router.get('/', getMunicipios);

// Define la ruta para crear un nuevo municipio
router.post('/', createMunicipio);

// Define la ruta para actualizar un municipio existente por su id
router.put('/:id', updateMunicipio);

// Define la ruta para eliminar un municipio por su id
router.delete('/:id', deleteMunicipio);

// Exporta el enrutador para que pueda ser usado en otros archivos
module.exports = router;
