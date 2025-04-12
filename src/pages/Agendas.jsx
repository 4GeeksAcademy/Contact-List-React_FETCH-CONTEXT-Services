import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { obtenerAgendas } from "../Services/Fetch.js";
import { Link } from "react-router-dom";
function Agendas() {
  const { store, dispatch } = useGlobalReducer();
  const { agendas } = store;

  // Cargar las agendas al montar el componente
  React.useEffect(() => {
    obtenerAgendas(dispatch);
  }, [dispatch]);

  // Renderizar las agendas
  const renderAgendas = () => {
    // Verificar si agendas.agendas existe y es un array
    if (!agendas.agendas || !Array.isArray(agendas.agendas)) {
      return <p>No hay agendas para mostrar</p>;
    }

    return agendas.agendas.map((agenda) => (
      <div key={agenda.id} className="card mb-3">
        <div className="card-body">
          <Link to={`/contactos/${agenda.slug}`}>
            <p className="card-text"> {agenda.slug}</p>
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mt-5">
      <h2>Agendas</h2>
      {agendas.agendas && agendas.agendas.length > 0 ? (
        renderAgendas()
      ) : (
        <p>No hay agendas disponibles</p>
      )}
    </div>
  );
}

export default Agendas;
