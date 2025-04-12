export const initialStore = () => {
  return {
    message: null,
    error: null,
    loading: false,
    agendas: [],
    contactos: [],
    contactoActual: null  // Para almacenar un contacto individual
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    // Casos para agendas
    case 'GET_AGENDAS':
      return {
        ...store,
        agendas: action.payload,
        loading: false,
        error: null
      };

    case 'CREATE_AGENDA':
      return {
        ...store,
        agendas: [...store.agendas, action.payload],
        message: 'Agenda creada exitosamente',
        loading: false
      };

    case 'DELETE_AGENDA':
      return {
        ...store,
        agendas: store.agendas.filter(agenda => agenda.slug !== action.payload),
        message: 'Agenda eliminada exitosamente',
        loading: false
      };

    // Casos para contactos
    case 'GET_CONTACTOS':
      return {
        ...store,
        contactos: action.payload, // Asigna directamente el array de contactos
        loading: false,
        error: null
      };

    case 'GET_CONTACTO':
      return {
        ...store,
        contactoActual: action.payload,
        loading: false
      };

    case 'CREATE_CONTACTO':
      return {
        ...store,
        contactos: [...store.contactos, action.payload],
        message: 'Contacto creado exitosamente',
        loading: false
      };

    case 'UPDATE_CONTACTO':
      return {
        ...store,
        contactos: store.contactos.map(contacto => 
          contacto.id === action.payload.id ? action.payload : contacto
        ),
        contactoActual: null,
        message: 'Contacto actualizado exitosamente',
        loading: false
      };

    case 'DELETE_CONTACTO':
      return {
        ...store,
        contactos: store.contactos.filter(contacto => contacto.id !== action.payload),
        message: 'Contacto eliminado exitosamente',
        loading: false
      };

    // Estados generales
    case 'SET_LOADING':
      return {
        ...store,
        loading: action.payload
      };

    case 'SET_MESSAGE':
      return {
        ...store,
        message: action.payload,
        error: null
      };

    case 'SET_ERROR':
      return {
        ...store,
        error: action.payload,
        message: null,
        loading: false
      };

    case 'RESET_STATE':
      return initialStore();

    default:
      return store;
  }
}