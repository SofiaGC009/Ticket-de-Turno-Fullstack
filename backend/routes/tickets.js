// Importa el módulo express
const express = require('express');
// Crea un enrutador con express
const router = express.Router();
// Importa los controladores para los tickets
const { getTickets, createTicket, updateTicket, deleteTicket } = require('../controllers/ticketsController');

// Define la ruta para obtener todos los tickets
router.get('/', getTickets);

// Define la ruta para crear un nuevo ticket
router.post('/', createTicket);

// Define la ruta para actualizar un ticket existente por su id
router.put('/:id', updateTicket);

// Define la ruta para eliminar un ticket por su id
router.delete('/:id', deleteTicket);

// Exporta el enrutador para que pueda ser usado en otros archivos
module.exports = router;
