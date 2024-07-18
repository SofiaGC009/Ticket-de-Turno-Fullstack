// /frontend/src/api/api.js
import api from './axios';

// Funciones para Municipios
export const getMunicipios = async () => {
  const response = await api.get('/municipios');
  return response.data;
};

export const createMunicipio = async (municipio) => {
  const response = await api.post('/municipios', municipio);
  return response.data;
};

export const updateMunicipio = async (id, municipio) => {
  const response = await api.put(`/municipios/${id}`, municipio);
  return response.data;
};

export const deleteMunicipio = async (id) => {
  const response = await api.delete(`/municipios/${id}`);
  return response.data;
};

// Funciones para Asuntos
export const getAsuntos = async () => {
  const response = await api.get('/asuntos');
  return response.data;
};

export const createAsunto = async (asunto) => {
  const response = await api.post('/asuntos', asunto);
  return response.data;
};

export const updateAsunto = async (id, asunto) => {
  const response = await api.put(`/asuntos/${id}`, asunto);
  return response.data;
};

export const deleteAsunto = async (id) => {
  const response = await api.delete(`/asuntos/${id}`);
  return response.data;
};

// Funciones para Niveles
export const getNiveles = async () => {
  const response = await api.get('/niveles');
  return response.data;
};

export const createNivel = async (nivel) => {
  const response = await api.post('/niveles', nivel);
  return response.data;
};

export const updateNivel = async (id, nivel) => {
  const response = await api.put(`/niveles/${id}`, nivel);
  return response.data;
};

export const deleteNivel = async (id) => {
  const response = await api.delete(`/niveles/${id}`);
  return response.data;
};

// Funciones para Tickets
export const getTickets = async () => {
  const response = await api.get('/tickets');
  return response.data;
};

export const createTicket = async (ticket) => {
  const response = await api.post('/tickets', ticket);
  return response.data;
};

export const updateTicket = async (id, ticket) => {
  const response = await api.put(`/tickets/${id}`, ticket);
  return response.data;
};

export const deleteTicket = async (id) => {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
};

export const getTicketByCurpAndTurno = async (curp, turno) => {
  const response = await api.get(`/tickets/${curp}/${turno}`);
  return response.data;
};
