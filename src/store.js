export const initialStore=()=>{
  return{
    message: null,
    agendas: [],
    contactos: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'GET_AGENDAS':
      return {
        ...store,
        agendas: action.payload,
      };
      case 'GET_CONTACTOS':
      return {
        ...store,
        contactos: action.payload,
      }
    default:
      throw Error('Unknown action.');
  }    
}
