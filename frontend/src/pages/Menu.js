import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "../components/common/NavBar";

const Menu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h1 className="text-center mb-4">Menú Principal</h1>
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Municipios</h5>
                <p className="card-text">Gestiona los municipios</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavigateTo("/municipios")}
                >
                  Ir a Municipios
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Asuntos</h5>
                <p className="card-text">Gestiona los asuntos</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavigateTo("/asuntos")}
                >
                  Ir a Asuntos
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Niveles</h5>
                <p className="card-text">Gestiona los niveles</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavigateTo("/niveles")}
                >
                  Ir a Niveles
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Administrar Tickets</h5>
                <p className="card-text">Gestiona los tickets</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavigateTo("/admin-tickets")}
                >
                  Ir a Administrar Tickets
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Dashboard</h5>
                <p className="card-text">Ver el tablero de estadísticas</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavigateTo("/dashboard")}
                >
                  Ir a Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
