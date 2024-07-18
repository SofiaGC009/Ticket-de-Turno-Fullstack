import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import QRCode from "qrcode.react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getNiveles, getMunicipios, getAsuntos, createTicket, updateTicket, getTicketByCurpAndTurno } from "../api/api"; // Ajustar la ruta según sea necesario

const TicketForm = () => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [curp, setCurp] = useState("");
  const [telefono, setTelefono] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [nivel, setNivel] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [asunto, setAsunto] = useState("");
  const [turno, setTurno] = useState("");
  const [niveles, setNiveles] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [asuntos, setAsuntos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [ticketList, setTicketList] = useState([]); // Definir ticketList

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nivelesData, municipiosData, asuntosData] = await Promise.all([
          getNiveles(),
          getMunicipios(),
          getAsuntos(),
        ]);
        setNiveles(nivelesData);
        setMunicipios(municipiosData);
        setAsuntos(asuntosData);

        // Si estamos editando, prellenar los datos del ticket
        if (location.state && location.state.ticket) {
          const ticket = location.state.ticket;
          setNombreCompleto(ticket.nombreCompleto);
          setCurp(ticket.curp);
          setTelefono(ticket.telefono);
          setCelular(ticket.celular);
          setCorreo(ticket.correo);
          setNivel(ticket.nivel_id);
          setMunicipio(ticket.municipio_id);
          setAsunto(ticket.asunto_id);
          setTurno(ticket.turno);
          setIsEditing(true);
        }
      } catch (error) {
        console.error("Error al obtener datos para los selects", error);
      }
    };

    fetchData();
  }, [location.state]);

  const validateInput = () => {
    const curpPattern = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]{1}\d{1}$/;
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombreCompleto.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Nombre Completo no puede estar vacío.",
      });
      return false;
    }
    if (!curp.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo CURP no puede estar vacío.",
      });
      return false;
    }
    if (!telefono.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Teléfono no puede estar vacío.",
      });
      return false;
    }
    if (!celular.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Celular no puede estar vacío.",
      });
      return false;
    }
    if (!correo.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Correo no puede estar vacío.",
      });
      return false;
    }
    if (!nivel) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Nivel no puede estar vacío.",
      });
      return false;
    }
    if (!municipio) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Municipio no puede estar vacío.",
      });
      return false;
    }
    if (!asunto) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Asunto no puede estar vacío.",
      });
      return false;
    }
    if (!curpPattern.test(curp)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "CURP no es válido.",
      });
      return false;
    }
    if (!phonePattern.test(telefono)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Teléfono no es válido. Debe tener 10 dígitos.",
      });
      return false;
    }
    if (!phonePattern.test(celular)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Celular no es válido. Debe tener 10 dígitos.",
      });
      return false;
    }
    if (!emailPattern.test(correo)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Correo no es válido.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;

    const nuevoTicket = {
      nombreCompleto,
      curp,
      telefono,
      celular,
      correo,
      nivel_id: nivel,
      municipio_id: municipio,
      asunto_id: asunto,
      turno: turno || obtenerTurno(municipio),
      status: 'Pendiente'
    };

    try {
      if (isEditing) {
        await updateTicket(nuevoTicket.curp, nuevoTicket);
        Swal.fire({
          icon: "success",
          title: "Ticket modificado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await createTicket(nuevoTicket);
        generarPDF(nuevoTicket);
        Swal.fire({
          icon: "success",
          title: "Solicitud registrada",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate("/admin-tickets");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar/modificar el ticket",
      });
    }
  };

  const obtenerTurno = (municipio) => {
    const ticketsPorMunicipio = ticketList.filter(
      (ticket) => ticket.municipio === municipio
    );
    return ticketsPorMunicipio.length + 1;
  };

  const generarPDF = (ticket) => {
    const doc = new jsPDF();
    doc.text("Comprobante de Solicitud de Ticket", 20, 20);
    doc.text(`Nombre Completo: ${ticket.nombreCompleto}`, 20, 30);
    doc.text(`CURP: ${ticket.curp}`, 20, 40);
    doc.text(`Teléfono: ${ticket.telefono}`, 20, 50);
    doc.text(`Celular: ${ticket.celular}`, 20, 60);
    doc.text(`Correo: ${ticket.correo}`, 20, 70);
    doc.text(`Nivel: ${niveles.find(n => n.id === ticket.nivel_id)?.nombre}`, 20, 80);
    doc.text(`Municipio: ${municipios.find(m => m.id === ticket.municipio_id)?.nombre}`, 20, 90);
    doc.text(`Asunto: ${asuntos.find(a => a.id === ticket.asunto_id)?.nombre}`, 20, 100);
    doc.text(`Turno: ${ticket.turno}`, 20, 110);

    const qrCanvas = document.getElementById("qrCode");
    const qrDataURL = qrCanvas.toDataURL("image/png");
    doc.addImage(qrDataURL, "PNG", 20, 120, 50, 50);

    doc.save(`Ticket_${ticket.curp}.pdf`);
  };

  const limpiar = () => {
    setNombreCompleto("");
    setCurp("");
    setTelefono("");
    setCelular("");
    setCorreo("");
    setNivel("");
    setMunicipio("");
    setAsunto("");
    setTurno("");
    setIsEditing(false);
  };

  const regresarInicio = () => {
    navigate("/admin-tickets");
  };

  return (
    <div className="container">
      <div className="card text-center mt-4">
        <div className="card-header">
          <h1>Solicitud de Ticket</h1>
        </div>
        <div className="card-body">
          <p>
            Complete los siguientes campos para registrar un nuevo ticket o
            para modificar un ticket existente.
          </p>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">CURP:</label>
              <input
                onChange={(event) => setCurp(event.target.value)}
                type="text"
                className="form-control"
                value={curp}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Número de Turno:</label>
              <input
                onChange={(event) => setTurno(event.target.value)}
                type="text"
                className="form-control"
                value={turno}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre Completo:</label>
              <input
                onChange={(event) => setNombreCompleto(event.target.value)}
                type="text"
                className="form-control"
                value={nombreCompleto}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Teléfono:</label>
              <input
                onChange={(event) => setTelefono(event.target.value)}
                type="text"
                className="form-control"
                value={telefono}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Celular:</label>
              <input
                onChange={(event) => setCelular(event.target.value)}
                type="text"
                className="form-control"
                value={celular}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Correo:</label>
              <input
                onChange={(event) => setCorreo(event.target.value)}
                type="text"
                className="form-control"
                value={correo}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Nivel:</label>
              <select
                onChange={(event) => setNivel(event.target.value)}
                className="form-control"
                value={nivel}
              >
                <option value="">Selecciona Nivel</option>
                {niveles.map((nivel) => (
                  <option key={nivel.id} value={nivel.id}>
                    {nivel.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Municipio:</label>
              <select
                onChange={(event) => setMunicipio(event.target.value)}
                className="form-control"
                value={municipio}
              >
                <option value="">Selecciona Municipio</option>
                {municipios.map((municipio) => (
                  <option key={municipio.id} value={municipio.id}>
                    {municipio.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Asunto:</label>
              <select
                onChange={(event) => setAsunto(event.target.value)}
                className="form-control"
                value={asunto}
              >
                <option value="">Selecciona el Asunto</option>
                {asuntos.map((asunto) => (
                  <option key={asunto.id} value={asunto.id}>
                    {asunto.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success m-2" onClick={handleSubmit}>
              {isEditing ? "Modificar Ticket" : "Generar Turno"}
            </button>
            <button className="btn btn-secondary m-2" onClick={limpiar}>
              Limpiar
            </button>
            <button className="btn btn-secondary m-2" onClick={regresarInicio}>
              Regresar al Inicio
            </button>
          </div>
        </div>
      </div>
      <div className="d-none">
        <QRCode id="qrCode" value={`CURP: ${curp}`} />
      </div>
    </div>
  );
};

export default TicketForm;
