
export const obtenerAgendas = async (dispatch) => {
    try {
        const response = await fetch("https://playground.4geeks.com/contact/agendas");
        const data = await response.json();
        dispatch({ type: "GET_AGENDAS", payload: data });
    } catch (error) {
        console.error("Error al obtener agendas:", error);
    }
}
export const crearAgenda = async (slug, dispatch) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Error al crear la agenda");
        }
        const data = await response.json();
        dispatch({ type: "GET_AGENDAS", payload: data });
    } catch (error) {
        console.error("Error al crear la agenda:", error);
    }
}
export const eliminarAgenda = async (slug, dispatch) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Error al eliminar la agenda");
        }
        const data = await response.json();
        dispatch({ type: "GET_AGENDAS", payload: data });
    } catch (error) {
        console.error("Error al eliminar la agenda:", error);
    }
}
export const obtenerContactos = async (slug, dispatch) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`);
        const data = await response.json();
        dispatch({ type: "GET_CONTACTOS", payload: data });
    } catch (error) {
        console.error("Error al obtener contactos:", error);
    }
}
export const crearContacto = async (slug, contacto, dispatch) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contacto),
        });
        if (!response.ok) {
            throw new Error("Error al crear el contacto");
        }
        const data = await response.json();
        dispatch({ type: "GET_CONTACTS", payload: data });
    } catch (error) {
        console.error("Error al crear el contacto:", error);
    }
}
export const eliminarContacto = async (slug, id, dispatch) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Error al eliminar el contacto");
        }
        const data = await response.json();
        dispatch({ type: "GET_CONTACTS", payload: data });
    } catch (error) {
        console.error("Error al eliminar el contacto:", error);
    }
}
export const editarContacto = async (slug, id, contacto, dispatch) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contacto),
        });
        if (!response.ok) {
            throw new Error("Error al editar el contacto");
        }
        const data = await response.json();
        dispatch({ type: "GET_CONTACTS", payload: data });
    } catch (error) {
        console.error("Error al editar el contacto:", error);
    }
}
export const obtenerContacto = async (slug, id, dispatch) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`);
        const data = await response.json();
        dispatch({ type: "GET_CONTACT", payload: data });
    } catch (error) {
        console.error("Error al obtener el contacto:", error);
    }
}