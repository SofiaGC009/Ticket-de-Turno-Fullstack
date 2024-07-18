import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <div className="card">
        <div className="card-header">
          <h1>Bienvenido a Ticket de Turno</h1>
        </div>
        <div className="card-body">
          <p className="lead">
            Esta es la plataforma para gestionar y solicitar turnos. Los
            administradores pueden acceder a funcionalidades avanzadas como
            gestionar catálogos y ver el estado de los turnos. Los usuarios
            pueden solicitar turnos y recibir un comprobante con un código QR.
          </p>
          <div className="row">
            <div className="col-12 col-md-6 mb-2">
              <Link to="/login" className="btn btn-primary btn-block">
                Admin Login
              </Link>
            </div>
            <div className="col-12 col-md-6 mb-2">
              <Link to="/ticket-form" className="btn btn-success btn-block">
                Solicitar Turno
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
