import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import NavBar from "../components/common/NavBar";
import { getTickets, deleteTicket, updateTicket } from '../api/api';
import { useNavigate } from 'react-router-dom';

const AdminTickets = () => {
  const [searchType, setSearchType] = useState("curp");
  const [searchValue, setSearchValue] = useState("");
  const [ticketList, setTicketList] = useState([]);
  const [allTickets, setAllTickets] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTicketList(data);
        setAllTickets(data);
      } catch (error) {
        Swal.fire('Error', 'No se pudieron cargar los tickets', 'error');
      }
    };
    fetchTickets();
  }, []);

  const validateSearchInput = () => {
    if (!searchValue.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo de búsqueda no puede estar vacío.",
      });
      return false;
    }
    return true;
  };

  const handleSearch = () => {
    if (!validateSearchInput()) return;

    let result;
    if (searchType === "curp") {
      result = allTickets.filter((ticket) => ticket.curp.toLowerCase() === searchValue.toLowerCase());
    } else if (searchType === "nombre") {
      result = allTickets.filter((ticket) => ticket.nombreCompleto.toLowerCase().includes(searchValue.toLowerCase()));
    }

    if (result.length > 0) {
      setTicketList(result);
    } else {
      Swal.fire("No se encontraron resultados", "", "info");
      setTicketList(allTickets); // Restablecer la lista de tickets si no hay resultados
    }
  };

  const handleResetSearch = () => {
    setTicketList(allTickets);
    setSearchValue("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id);
      const updatedTickets = ticketList.filter((ticket) => ticket.id !== id);
      setTicketList(updatedTickets);
      setAllTickets(updatedTickets); // Actualizar la lista completa también
      Swal.fire("Eliminado!", "El ticket ha sido eliminado.", "success");
    } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar el ticket', 'error');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTicket(id, { status: newStatus });
      const updatedTickets = ticketList.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      );
      setTicketList(updatedTickets);
      setAllTickets(updatedTickets); // Actualizar la lista completa también
      Swal.fire(
        "Actualizado!",
        `El estatus del ticket ha sido actualizado a ${newStatus}.`,
        "success"
      );
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el estado del ticket', 'error');
    }
  };

  const handleEdit = (ticket) => {
    navigate('/ticket-form', { state: { ticket } });
  };

  return (
    <div className="container-fluid">
      <NavBar />
      <div className="card mt-4">
        <div className="card-header text-center">
          <h1>Administrar Tickets</h1>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <select
                onChange={(e) => setSearchType(e.target.value)}
                className="form-select"
                value={searchType}
              >
                <option value="curp">Buscar por CURP</option>
                <option value="nombre">Buscar por Nombre</option>
              </select>
            </div>
            <div className="col-md-6 input-group">
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className="form-control"
                placeholder={`Ingrese ${searchType}`}
                value={searchValue}
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                Buscar
              </button>
              <button className="btn btn-secondary" onClick={handleResetSearch}>
                Restablecer
              </button>
            </div>
          </div>
          <button className="btn btn-success mb-3" onClick={() => navigate('/ticket-form')}>Agregar nuevo ticket</button>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>CURP</th>
                  <th>Teléfono</th>
                  <th>Celular</th>
                  <th>Correo</th>
                  <th>Municipio</th>
                  <th>Asunto</th>
                  <th>Turno</th>
                  <th>Estatus</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ticketList.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.nombreCompleto}</td>
                    <td>{ticket.curp}</td>
                    <td>{ticket.telefono}</td>
                    <td>{ticket.celular}</td>
                    <td>{ticket.correo}</td>
                    <td>{ticket.Municipio?.nombre || 'Desconocido'}</td>
                    <td>{ticket.Asunto?.nombre || 'Desconocido'}</td>
                    <td>{ticket.turno}</td>
                    <td>{ticket.status}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-info"
                          onClick={() => handleEdit(ticket)}
                        >
                          Modificar
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(ticket.id)}
                        >
                          Eliminar
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            handleStatusChange(ticket.id, "Pendiente")
                          }
                        >
                          Pendiente
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleStatusChange(ticket.id, "Resuelto")
                          }
                        >
                          Resuelto
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
