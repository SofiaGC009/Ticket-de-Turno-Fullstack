import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../common/NavBar";
import { getNiveles, createNivel, updateNivel, deleteNivel } from '../../api/api';

function Nivel() {
  const [nivel, setNivel] = useState("");
  const [editar, setEditar] = useState(false);
  const [nivelList, setNivelList] = useState([]);
  const [idNivelEditar, setIdNivelEditar] = useState(null);

  useEffect(() => {
    const fetchNiveles = async () => {
      try {
        const data = await getNiveles();
        setNivelList(data);
      } catch (error) {
        Swal.fire('Error', 'No se pudieron cargar los niveles', 'error');
      }
    };
    fetchNiveles();
  }, []);

  const validateInput = () => {
    if (!nivel.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Nivel no puede estar vacío.",
      });
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(nivel)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El campo Nivel solo puede contener letras y espacios.",
      });
      return false;
    }

    if (
      nivelList.some(
        (n) =>
          n.nombre.toLowerCase() === nivel.trim().toLowerCase() &&
          n.id !== idNivelEditar
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nivel ya existe.",
      });
      return false;
    }

    return true;
  };

  const registrar = async () => {
    if (!validateInput()) return;

    try {
      const nuevoNivel = await createNivel({ nombre: nivel });
      setNivelList([...nivelList, nuevoNivel]);
      limpiar();
      Swal.fire({
        icon: "success",
        title: "Nivel " + nivel + " registrado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire('Error', 'No se pudo registrar el nivel', 'error');
    }
  };

  const update = async () => {
    if (!validateInput()) return;

    try {
      await updateNivel(idNivelEditar, { nombre: nivel });
      setNivelList(
        nivelList.map((n) =>
          n.id === idNivelEditar ? { id: idNivelEditar, nombre: nivel } : n
        )
      );
      limpiar();
      Swal.fire({
        icon: "success",
        title: "Nivel " + nivel + " actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el nivel', 'error');
    }
  };

  const eliminar = async (val) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar el nivel?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteNivel(val.id);
          setNivelList(nivelList.filter((n) => n.id !== val.id));
          limpiar();
          Swal.fire(
            "Eliminado!",
            `El nivel ${val.nombre} fue eliminado.`,
            "success"
          );
        } catch (error) {
          Swal.fire('Error', 'No se pudo eliminar el nivel', 'error');
        }
      }
    });
  };

  const editarNivel = (val) => {
    setEditar(true);
    setIdNivelEditar(val.id);
    setNivel(val.nombre);
  };

  const limpiar = () => {
    setIdNivelEditar(null);
    setNivel("");
    setEditar(false);
  };

  return (
    <div className="container">
      <NavBar />
      <div className="card mt-4">
        <div className="card-header text-center">
          <h1>NIVELES</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">Nivel:</span>
              <input
                type="text"
                className="form-control"
                value={nivel}
                onChange={(event) => setNivel(event.target.value)}
              />
            </div>
          </div>
          {editar ? (
            <div className="d-flex justify-content-center">
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-danger m-2" onClick={limpiar}>
                Cancelar
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <button className="btn btn-success m-2" onClick={registrar}>
                Registrar
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="card mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nivel</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {nivelList.map((val) => (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.nombre}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => editarNivel(val)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => eliminar(val)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Nivel;
