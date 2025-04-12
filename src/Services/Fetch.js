// Configuración base
const API_BASE_URL = "https://playground.4geeks.com/contact";

// Función de fetch genérica para reutilización
const fetchAPI = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Operaciones con agendas
export const obtenerAgendas = async (dispatch) => {
  try {
    const data = await fetchAPI("/agendas");
    dispatch({ type: "GET_AGENDAS", payload: data });
  } catch (error) {
    console.error("Error al obtener agendas:", error);
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};

export const crearAgenda = async (slug, dispatch) => {
  try {
    const data = await fetchAPI(`/agendas/${slug}`, { method: "POST" });
    dispatch({ type: "CREATE_AGENDA", payload: data });
    dispatch({ type: "SET_MESSAGE", payload: "Agenda creada exitosamente" });
  } catch (error) {
    console.error("Error al crear agenda:", error);
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};

export const eliminarAgenda = async (slug, dispatch) => {
  try {
    await fetchAPI(`/agendas/${slug}`, { method: "DELETE" });
    dispatch({ type: "DELETE_AGENDA", payload: slug });
    dispatch({ type: "SET_MESSAGE", payload: "Agenda eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar agenda:", error);
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};

// Operaciones con contactos
export const obtenerContactos = async (slug, dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await fetch(`${API_BASE_URL}/agendas/${slug}/contacts`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener contactos');
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        console.warn('Los contactos recibidos no son un array:', data);
        // Si la API devuelve un objeto con la propiedad contacts
        const contactsArray = data.contacts || [];
        dispatch({ type: 'GET_CONTACTOS', payload: contactsArray });
        return;
      }
      
      dispatch({ type: 'GET_CONTACTOS', payload: data });
      
    } catch (error) {
      console.error("Error al obtener contactos:", error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
export const obtenerContacto = async (slug, id, dispatch) => {
  try {
    const data = await fetchAPI(`/agendas/${slug}/contacts/${id}`);
    dispatch({ type: "GET_CONTACTO", payload: data });
  } catch (error) {
    console.error("Error al obtener contacto:", error);
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};

export const crearContacto = async (slug, contacto, dispatch) => {
  try {
    const data = await fetchAPI(`/agendas/${slug}/contacts`, {
      method: "POST",
      body: JSON.stringify(contacto)
    });
    dispatch({ type: "CREATE_CONTACTO", payload: data });
    dispatch({ type: "SET_MESSAGE", payload: "Contacto creado exitosamente" });
  } catch (error) {
    console.error("Error al crear contacto:", error);
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};

export const editarContacto = async (slug, id, contacto, dispatch) => {
  try {
    const data = await fetchAPI(`/agendas/${slug}/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify(contacto)
    });
    dispatch({ type: "UPDATE_CONTACTO", payload: data });
    dispatch({ type: "SET_MESSAGE", payload: "Contacto actualizado exitosamente" });
  } catch (error) {
    console.error("Error al editar contacto:", error);
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};

export const eliminarContacto = async (slug, id, dispatch) => {
  try {
    await fetchAPI(`/agendas/${slug}/contacts/${id}`, { method: "DELETE" });
    dispatch({ type: "DELETE_CONTACTO", payload: id });
    dispatch({ type: "SET_MESSAGE", payload: "Contacto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar contacto:", error);
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};