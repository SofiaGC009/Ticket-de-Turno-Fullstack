import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Municipios from "./components/crud/Municipios";
import Asuntos from "./components/crud/Asuntos";
import Nivel from "./components/crud/Nivel";
import AdminTickets from "./components/AdminTickets";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import TicketForm from "./pages/TicketForm";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ticket-form" element={<TicketForm />} />
          <Route
            path="/menu"
            element={
              <PrivateRoute>
                <Menu />
              </PrivateRoute>
            }
          />
          <Route
            path="/municipios"
            element={
              <PrivateRoute>
                <Municipios />
              </PrivateRoute>
            }
          />
          <Route
            path="/asuntos"
            element={
              <PrivateRoute>
                <Asuntos />
              </PrivateRoute>
            }
          />
          <Route
            path="/niveles"
            element={
              <PrivateRoute>
                <Nivel />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-tickets"
            element={
              <PrivateRoute>
                <AdminTickets />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
