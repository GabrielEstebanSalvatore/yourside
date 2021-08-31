
import AppConstant from './appConstant';

export default (state, action) => {
    switch(action.type) {
        case AppConstant.HANDLE_MODAL: 
            return {
                ...state,
                modalView: action.modalView,
                showModal: action.showModal,
            }
        case AppConstant.SET_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        case AppConstant.CERRAR_SESION:
            return {
                ...state,
                message: '',
                configuration: null
            }
        case AppConstant.CREATE_CONFIGURACION:
            return {
                ...state,
                configuration: action.payload.configuration,
                message: action.payload.message
            }
        case AppConstant.GET_CONFIGURATION:
            return {
                ...state,
                configuration: action.payload.configuration,
            }
        case AppConstant.SUCCESSFUL_PURCHASE:
        case AppConstant.CREATE_TIPOARTICULO:
            return {
                ...state,
                message: action.payload.message, 
            }
        case AppConstant.TRAER_TIPOARTICULO:
            return {
                ...state,
                articleTypeList: action.payload
            }
        case AppConstant.GET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            }
        case AppConstant.GET_OFFERS:
            return {
                ...state,
                offerList: action.payload
            }
        case AppConstant.CURRENT:
            return {
                ...state,
                currentState: action.payload
            }
        case AppConstant.SACAR_CARRITO:
            return {
                ...state,
                trolley: state.trolley.filter(article => article._id !== action.payload)
            }
        case AppConstant.AGREGAR_COMPROBANTES:
            return {
                ...state,
                comprobantes:  action.payload
            }
        case AppConstant.TRAER_MARCAS:
            return {
                ...state,
                branchList:  action.payload
            }
        case AppConstant.ADDARTICLEVIEW:
            return {   
                ...state,       
                articleView: action.article 
            }  
        case AppConstant.GET_BOXES:
            return {   
                ...state,       
                boxesList: action.payload 
            }  
        default:
            return state
       
    }
}
