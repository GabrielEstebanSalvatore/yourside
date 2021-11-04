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
        brandList: [],
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
            payload: article,
        })
    }
    const logOut = async () => {
        dispatch({
            type: AppConstant.LOGOUT,
        })
        handleModal('', false)
    }

    const newConfiguration = async (data) => {
        try {
            const response = await clienteAxios.post('/configuration', data)
            dispatch({
                type: AppConstant.CREATE_CONFIGURACION,
                payload: response.data.configuration,
            })
            handleModal('MensajeRegistro', true)
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('Error al crear la configuración')
        }
    }
    const getConfiguration = async (data) => {
        try {
            const response = await clienteAxios.get('/configuration', data)
            if (response.data.response == null) return
            dispatch({
                type: AppConstant.GET_CONFIGURATION,
                payload: response.data.response,
            })
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer la configuración')
        }
    }
    const editConfiguration = async (data) => {
        try {
            const response = await clienteAxios.put(
                `/configuration/${data.id}`,
                data
            )
            setMessage(response.data.message)
            getConfiguration()
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al editar la configuración')
        }
    }

    const getArticleType = async () => {
        try {
            const response = await clienteAxios.get('/articlesType')
            dispatch({
                type: AppConstant.TRAER_TIPOARTICULO,
                payload: response.data.response,
            })
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer el Tipo de Artículo')
        }
    }
    const deleteArticleType = async (tipoArticuloId) => {
        try {
            await clienteAxios.delete(`/articlestype/${tipoArticuloId}`)
            getArticleType()
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al eliminar el Tipo de Artículo')
        }
    }

    const deleteBrand = async (brandId) => {
        try {
            await clienteAxios.delete(`/brands/${brandId}`)
            getBrands()
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
            await clienteAxios.put(`/articlestype/${data.id}`, data)
            dispatch(getArticleType())
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al editar el Tipo de Artículo')
        }
    }

    const editBrand = async (data) => {
        try {
            await clienteAxios.put(`/brands/${data.id}`, data)
            dispatch(getBrands())
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al editar la marca')
        }
    }

    const editOffer = async (data) => {
        try {
            await clienteAxios.post(`/offer/${data.id}`, data)
            dispatch(getOffers())
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('Error al editar la oferta')
        }
    }

    const getArticles = async () => {
        try {
            const response = await clienteAxios.get('/articles')
            dispatch({
                type: AppConstant.GET_ARTICLES,
                payload: response.data.response,
            })
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer los artículos')
        }
    }

    const editArticle = async (data) => {
        try {
            var currentArticle = data.article
            if (data.file) {
                //CREATING IMAGE
                const formDataImage = new FormData()
                formDataImage.append('image', data.file)
                const imageId = await clienteAxios.post(
                    '/articlesimages',
                    formDataImage
                )
                currentArticle.imageId = imageId.data.img._id
            }
            await clienteAxios.put(
                `/articles/${currentArticle.id}`,
                currentArticle
            )
            dispatch(getArticles())
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al editar el artículo')
        }
    }

    const newArticule = async (data) => {
        var newArticle = data.article
        //CREATING IMAGE
        const formDataImage = new FormData()
        formDataImage.append('image', data.file)

        const imageId = await clienteAxios.post(
            '/articlesimages',
            formDataImage
        )

        newArticle.imageId = imageId.data.img._id

        //CREATING ARTICLE
        const response = await clienteAxios.post('/articles', newArticle)
        if (response != null) {
            try {
                handleModal('MensajeRegistro', true)
                setMessage(response.data.message)
            } catch (error) {
                handleModal('MensajeRegistro', true)
                setMessage(response.data.message)
            }
        } else {
            handleModal('MensajeRegistro', true)
            setMessage('Error al crear el artículo')
        }
    }

    const deleteArticle = async (articuloId) => {
        try {
            await clienteAxios.delete(`/articles/${articuloId}`)
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
            const response = await clienteAxios.post(`/soldarticles`, data)
            dispatch({
                type: AppConstant.SUCCESSFUL_PURCHASE,
                payload: response.data,
            })
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('Error al realizar la compra')
        }
    }

    const traerComprobantes = async (cliente) => {
        try {
            const respuesta = await clienteAxios.get(`/receipts`, {
                id: cliente._id,
            })
            dispatch({
                type: AppConstant.AGREGAR_COMPROBANTES,
                payload: respuesta.data.response,
            })
        } catch (error) {
            setMessage('Error al traer los comprobantes')
        }
    }

    const traerComprobantesAdmin = async () => {
        try {
            const respuesta = await clienteAxios.get(`/receipts`)
            dispatch({
                type: AppConstant.AGREGAR_COMPROBANTES,
                payload: respuesta.data.comprobantes,
            })
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer los comprobantes')
        }
    }

    const getBrands = async () => {
        try {
            const response = await clienteAxios.get(`/brands`)
            dispatch({
                type: AppConstant.TRAER_MARCAS,
                payload: response.data.response,
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
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Error al traer las ofertas')
        }
    }

    const newArticleType = async (data) => {
        try {
            const response = await clienteAxios.post('/articlestype', data)
            setMessage(response.data.message)
            getArticleType()
        } catch {
            handleModal('MensajeRegistro', true)
            setMessage('Some error occurred')
        }
    }

    const newBrand = async (data) => {
        try {
            const response = await clienteAxios.post('/brands', data)
            setMessage(response.data.message)
            getBrands()
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
                brandList: state.brandList,
                articleView: state.articleView,
                offerList: state.offerList,
                boxesList: state.boxesList,
                handleModal,
                setMessage,
                logOut,
                newConfiguration,
                newArticleType,
                newOffer,
                newBrand,
                newArticule,
                deleteArticleType,
                deleteArticle,
                deleteBrand,
                deleteOffer,
                editConfiguration,
                editArticle,
                editBrand,
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
                getBrands,
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
