import React from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { obtenerContacto } from "../Services/Fetch.js"; // Importa la función obtenerAgendas

function Contactos() {
  const { store, dispatch } = useGlobalReducer();
  const { slug } = useParams();
  const { contactos } = store;

  useEffect(() => {
    obtenerContacto(slug, dispatch); // Cargar contactos al montar el componente
  }, [dispatch]);
  console.log("contactos", contactos);
  return <div>soy los contactos de:{slug}</div>;
}

export default Contactos;
