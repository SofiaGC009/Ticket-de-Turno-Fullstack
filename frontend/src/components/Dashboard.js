import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import NavBar from "../components/common/NavBar";
import { getTickets } from "../api/api"; // Importa la función getTickets del archivo api.js

const Dashboard = () => {
  const [statusCounts, setStatusCounts] = useState({
    pendiente: 0,
    resuelto: 0,
  });
  const [selectedMunicipio, setSelectedMunicipio] = useState("Total");
  const [tickets, setTickets] = useState([]); // Estado para almacenar los tickets

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data); // Actualiza el estado con los tickets obtenidos del backend
      } catch (error) {
        console.error("Error al obtener los tickets", error);
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const filteredTickets = selectedMunicipio === "Total" ? tickets : tickets.filter((ticket) => ticket.municipio === selectedMunicipio);
    const pendiente = filteredTickets.filter((ticket) => ticket.status === "Pendiente").length;
    const resuelto = filteredTickets.filter((ticket) => ticket.status === "Resuelto").length;
    setStatusCounts({ pendiente, resuelto });
  }, [selectedMunicipio, tickets]);

  const data = [
    { name: "Pendiente", value: statusCounts.pendiente },
    { name: "Resuelto", value: statusCounts.resuelto },
  ];

  const COLORS = ["#FF8042", "#0088FE"];

  const municipios = ["Total", ...new Set(tickets.map(ticket => ticket.municipio))];

  return (
    <div className="container-fluid">
      <NavBar />
      <div className="card mt-4">
        <div className="card-header text-center">
          <h1>Dashboard</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <select
              onChange={(e) => setSelectedMunicipio(e.target.value)}
              className="form-select"
              value={selectedMunicipio}
            >
              {municipios.map((municipio) => (
                <option key={municipio} value={municipio}>
                  {municipio}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-3">
              <h3>Estatus de Tickets</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <h3>Comparativa de Estatus</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={data}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
