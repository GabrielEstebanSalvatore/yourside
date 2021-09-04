import React, { useReducer } from 'react'
import AppConstant from './appConstant'
import AppContext from './appContext'
import AppReducer from './appReducer'
import clienteAxios from '../../services/axios'

const AppState = (props) => {
    const initialState = {
        login: {},
        currentState: {},
        articleTypeList: [],
        articles: [],
        comprobantes: [],
        branchList: [],
        articleView: [],
        offerList: [],
        boxesList: [],
        modalView: '', //MensajeRegistro
        showModal: false, //true para mostrar modal
        loadingApp: false,
        message: '',
        configuration: {},
    }

    const [state, dispatch] = useReducer(AppReducer, initialState)

    const handleModal = (modalView, showModal) => {
        
        dispatch({
            type: AppConstant.HANDLE_MODAL,
            showModal,
            modalView,
        })
    }
    const setMessage = (message) => {
        dispatch({
            type: AppConstant.SET_MESSAGE,
            message,
        })
    }
    const addArticleView = async (article) => {
        dispatch({
            type: AppConstant.ADDARTICLEVIEW,
            article: article,
        })
    }
    const cerrarSesion = async () => {
        dispatch({
            type: AppConstant.CERRAR_SESION,
        })
        handleModal('', false)
    }

    const newConfiguration = async (data) => {
        try {
            const response = await clienteAxios.post('/configuracion', data)
           
            dispatch({
                type: AppConstant.CREATE_CONFIGURACION,
                payload: response.data,
            })
            handleModal('MensajeRegistro', true)
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('Error al crear la configuración')
        }
    }
    const getConfiguration = async (data) => {
        try {
            const response = await clienteAxios.get('/configuracion', data)
            if (response.data.configuration == null) return
            dispatch({
                type: AppConstant.GET_CONFIGURATION,
                payload: response.data,
            })
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer la configuración')
        }
    }
    const editConfiguration = async (data) => {
        try {
            const response = await clienteAxios.put(
                `/configuracion/${data.id}`,
                data
            )

            setMessage(response.data.message)
            getConfiguration()
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al editar la configuración')
        }
    }

    const getArticleType = async (data) => {
        try {
            const response = await clienteAxios.get('/tipoarticulos')
            dispatch({
                type: AppConstant.TRAER_TIPOARTICULO,
                payload: response.data.tipoarticulos,
            })
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer el Tipo de Artículo')
        }
    }
    const deleteArticleType = async (tipoArticuloId) => {
        try {
            const respuesta = await clienteAxios.delete(
                `/tipoarticulos/${tipoArticuloId}`
            )
            getArticleType()
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al eliminar el Tipo de Artículo')
        }
    }

    const deleteBrach = async (branchId) => {

        try {
            const respuesta = await clienteAxios.delete(`/branches/${branchId}`)
            traerMarcas()
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al eliminar la marca')
        }
    }

    const deleteOffer = async (offerId) => {
        try {
            await clienteAxios.put(`/offer/${offerId}`)
            getOffers()
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al eliminar la oferta')
        }
    }

    const current = async (object) => {
        try {
            dispatch({
                type: AppConstant.CURRENT,
                payload: object,
            })
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error')
        }
    }

    const editarTipoArticulo = async (data) => {
        
        try {
            await clienteAxios.put(
                `/tipoarticulos/${data.id}`,
                data
            )
            dispatch(getArticleType())
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al editar el Tipo de Artículo')
        }
    }

    const editBranch = async (data) => {
        try {
            const respuesta = await clienteAxios.put(
                `/branches/${data.id}`,
                data
            )
            dispatch(traerMarcas())
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al editar la marca')
        }
    }

    const editOffer = async (data) => {
        try {
            const respuesta = await clienteAxios.post(`/offer/${data.id}`, data)
            dispatch(getOffers())
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('Error al editar la oferta')
        }
    }

    const getArticles = async (data) => {
        try {
            const response = await clienteAxios.get('/articulos')
            dispatch({
                type: AppConstant.GET_ARTICLES,
                payload: response.data.articles,
            })
        } catch {
            handleModal('MensajeRegistro',true)
            setMessage('Error al traer los artículos')
        }
    } 
    
    const editArticle = async (data)=>{
        try {
            if(data.file)
            {
                var currentArticle = data.article;
                //CREATING IMAGE 
                const formDataImage = new FormData()
                formDataImage.append('image', data.file)
                const imageId = await clienteAxios.post('/articulosimagen',formDataImage)
                currentArticle.imageId = imageId.data.img._id;
            }
            await clienteAxios.put(`/articulos/${currentArticle.id}`,currentArticle);
            dispatch(getArticles())

        } catch {
            handleModal('MensajeRegistro',true)
            setMessage('Error al editar el artículo')
        }
    } 

    const newArticule = async (data) => {
        var newArticle = data.article
        //CREATING IMAGE
        const formDataImage = new FormData()
        formDataImage.append('image', data.file)

        const imageId = await clienteAxios.post(
            '/articulosimagen',
            formDataImage
        )

        newArticle.imageId = imageId.data.img._id

        //CREATING ARTICLE
        const response = await clienteAxios.post('/articulos', newArticle)

        if (response != null) {
            try {

                handleModal('MensajeRegistro', true)
                setMessage(response.data.message)
            
            } catch (error) {

                handleModal('MensajeRegistro', true)
                setMessage(response.data.message)
            }
        } else {
            handleModal('MensajeRegistro',true)
            setMessage('Error al crear el artículo')
        }
    }

    const deleteArticle = async (articuloId) => {
        try {
            await clienteAxios.delete(`/articulos/${articuloId}`)
            getArticles()
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('Error al eliminar el artículo')
        }
    }
    const sacarArticuloCarrito = async (articlesId) => {
        try {
            dispatch({
                type: AppConstant.SACAR_CARRITO,
                payload: articlesId,
            })
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al sacar el artículo')
        }
    }
    const purchaseApp = async (data) => {
        try {
            const response = await clienteAxios.post(`/articulosvendidos`, data)
            dispatch({
                type: AppConstant.SUCCESSFUL_PURCHASE,
                payload: response.data,
            })
            handleModal('MensajeRegistro', true)
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('Error al realizar la compra')
        }
    }

    const traerComprobantes = async (cliente) => {
        try {
            const respuesta = await clienteAxios.post(`/comprobantes`, {
                id: cliente._id,
            })
            dispatch({
                type: AppConstant.AGREGAR_COMPROBANTES,
                payload: respuesta.data.comprobantes,
            })
        } catch (error) {
            setMessage('Error al traer los comprobantes')
        }
    }

    const traerComprobantesAdmin = async () => {
        try {
            const respuesta = await clienteAxios.get(`/comprobantes`)
            dispatch({
                type: AppConstant.AGREGAR_COMPROBANTES,
                payload: respuesta.data.comprobantes,
            })
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer los comprobantes')
        }
    }

    const traerMarcas = async () => {
        try {
            const respuesta = await clienteAxios.get(`/branches`)
            dispatch({
                type: AppConstant.TRAER_MARCAS,
                payload: respuesta.data.branches,
            })
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer las marcas')
        }
    }

    const getOffers = async () => {
        try {
            const respuesta = await clienteAxios.get(`/offer`)
            dispatch({
                type: AppConstant.GET_OFFERS,
                payload: respuesta.data.offers,
            })
        } catch{
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer las ofertas')
        }
    }

    const newArticleType = async (data) => {
        try {
            const response = await clienteAxios.post('/tipoarticulos', data)
            setMessage(response.data.message)
            getArticleType()
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer Tipo de Artículo')
        }
    }

    const newBranch = async (data) => {
        try {
            const response = await clienteAxios.post('/branches', data)
            setMessage(response.data.message)
            traerMarcas()
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer las marcas')
        }
    }
    const newOffer = async (data) => {
        try {
            const response = await clienteAxios.post('/offer', data)
            setMessage(response.data.message)
            getOffers()
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer las ofertas')
        }
    }

    const getBox = async () => {
        try {
            const respuesta = await clienteAxios.get(`/boxes`)
            dispatch({
                type: AppConstant.GET_BOXES,
                payload: respuesta.data.boxes,
            })
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer las cajas')
        }
    }

    return (
        <AppContext.Provider
            value={{
                login: state.login,
                modalView: state.modalView,
                showModal: state.showModal,
                loadingApp: state.loadingApp,
                message: state.message,
                configuration: state.configuration,
                articleTypeList: state.articleTypeList,
                articles: state.articles,
                currentState: state.currentState,
                comprobantes: state.comprobantes,
                branchList: state.branchList,
                articleView: state.articleView,
                offerList: state.offerList,
                boxesList: state.boxesList,
                handleModal,
                setMessage,
                cerrarSesion,
                newConfiguration,
                newArticleType,
                newOffer,
                newBranch,
                newArticule,
                deleteArticleType,
                deleteArticle,
                deleteBrach,
                deleteOffer,
                editConfiguration,
                editArticle,
                editBranch,
                editarTipoArticulo,
                editOffer,
                current,
                sacarArticuloCarrito,
                purchaseApp,
                getArticleType,
                getConfiguration,
                getArticles,
                traerComprobantes,
                traerComprobantesAdmin,
                traerMarcas,
                getOffers,
                getBox,
                addArticleView,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState
