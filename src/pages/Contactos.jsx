import React from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { obtenerContactos } from "../Services/Fetch.js";

function Contactos() {
  const { store, dispatch } = useGlobalReducer();
  const { slug } = useParams();
  const { contactos, loading, error } = store;

  useEffect(() => {
    obtenerContactos(slug, dispatch);
  }, [slug, dispatch]);

  if (loading) return <div>Cargando contactos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Contactos de: {slug}</h2>
      
      {contactos && contactos.length > 0 ? (
        <ul>
          {contactos.map(contacto => (
            <li key={contacto.id || contacto.email}>
              <p>Nombre: {contacto.full_name}</p>
              <p>Email: {contacto.email}</p>
              <p>Teléfono: {contacto.phone}</p>
              <p>Dirección: {contacto.address}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay contactos disponibles para esta agenda</p>
      )}
    </div>
  );
}

export default Contactos;