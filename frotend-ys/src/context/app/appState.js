import React, { useReducer } from 'react';
import AppConstant from './appConstant';
import AppContext from './appContext';
import AppReducer from './appReducer'
import clienteAxios from '../../services/axios';

const AppState = (props) =>{

    const initialState = {
        login:{},
        currentState: {},
        articleTypeList:[],
        articles:[],
        comprobantes:[],
        branchList:[],
        articleView:[],
        offerList:[],
        boxesList:[],
        modalView: '',//MensajeRegistro
        showModal: false,//true para mostrar modal
        loadingApp: false,
        message:'',
        configuration: {},
    }

    const [ state, dispatch ] = useReducer(AppReducer, initialState);

   
    const  handleModal= (modalView,showModal) => {

        console.log("modal",modalView, "show",showModal);
        dispatch({
            type: AppConstant.HANDLE_MODAL,
            showModal,
            modalView
        })
    }
    const setMessage = (message) => {
        dispatch({
            type: AppConstant.SET_MESSAGE,
            message
        })
    }
    const addArticleView = async (article)=>{
        //console.log(article)
         dispatch({
             
             type: AppConstant.ADDARTICLEVIEW,
             article: article
         })
     
    } 
    const cerrarSesion = async ()=>{
       
        dispatch({
            type: AppConstant.CERRAR_SESION
        })
        handleModal('',false)
    } 
    
    const newConfiguration = async (data)=>{
        
        try {
            const response = await clienteAxios.post('/configuracion',data);
            console.log("newConfiguration",response)
            dispatch({
                type: AppConstant.CREATE_CONFIGURACION,
                payload: response.data
            })
            handleModal('MensajeRegistro',true);

        } catch (error) {
            console.log(error );
        }
    } 
    const getConfiguration = async (data)=>{
       
        try {
            const response = await clienteAxios.get('/configuracion',data);
            if(response.data.configuration == null)return;
            dispatch({
                type: AppConstant.GET_CONFIGURACION,
                payload: response.data
            })
               
        } catch (error) {
            console.log(error );
        }
    } 
    const editConfiguration = async (data)=>{
        try {
            const response = await clienteAxios.put(`/configuracion/${data.id}`,data);
            
            setMessage(response.data.message);
            getConfiguration();

        } catch (error) {
            console.log(error );
        }
    } 
    
    const getArticleType = async (data)=>{
       
        try {
            const response = await clienteAxios.get('/tipoarticulos');
            dispatch({
                type: AppConstant.TRAER_TIPOARTICULO,
                payload: response.data.tipoarticulos
            })
            
        } catch (error) {
            console.log(error );
        }
    } 
    const deleteArticleType = async(tipoArticuloId)=>{
        try{
            const respuesta = await clienteAxios.delete(`/tipoarticulos/${tipoArticuloId}`)
            getArticleType();
        }
        catch(error){
            console.log(error);
        }
    }
    
    const deleteBrach = async(branchId)=>{
        console.log(branchId)
        try{
            const respuesta = await clienteAxios.delete(`/branches/${branchId}`)
            traerMarcas();
        }
        catch(error){
            console.log(error);
        }
    }

    const deleteOffer = async(offerId)=>{
        try{
            const respuesta = await clienteAxios.put(`/offer/${offerId}`)
            console.log(respuesta)
            getOffers();
        }
        catch(error){
            console.log(error);
        }
    }

    const current = async(object)=>{
        try{
            dispatch({
                type: AppConstant.CURRENT,
                payload: object
            })
        }
        catch(error){
            console.log(error);
        }
    }
   
    const editarTipoArticulo = async (data)=>{
        console.log(data)
        try {
            const respuesta = await clienteAxios.put(`/tipoarticulos/${data.id}`,data);
            console.log(respuesta)
            dispatch(getArticleType())
            
        } catch (error) {
            console.log(error );
        }
    } 

    const editArticle = async (data)=>{
        try {
            await clienteAxios.put(`/articulos/${data.id}`,data);
            dispatch(getArticles())
            
        } catch (error) {
            console.log(error );
        }
    } 

    const editBranch = async (data)=>{
        try {
            const respuesta = await clienteAxios.put(`/branches/${data.id}`,data);
            console.log(respuesta)
            dispatch(traerMarcas())
            
        } catch (error) {
            console.log(error );
        }
    } 

    const editOffer = async (data)=>{
        console.log("OFERTAS",data)
        try {
            const respuesta = await clienteAxios.post(`/offer/${data.id}`,data);
            console.log(respuesta)
            dispatch(getOffers())
            
        } catch (error) {
            console.log(error );
        }
    } 

    const getArticles = async (data)=>{
        try {
            const response = await clienteAxios.get('/articulos');
            console.log("GET",response)
            dispatch({
                type: AppConstant.GET_ARTICLES,
                payload: response.data.articles
            })
            
        } catch (error) {
            console.log(error );
        }
    } 
    //TODO ARREGLAR ESTO
    const newArticule = async (data)=>{
        console.log('data', data)
        var newArticle = data.article;
        //CREATING IMAGE 
        const formDataImage = new FormData()
        formDataImage.append('image', data.file)
        //formDataImage.append('article', data.article)
        const imageId = await clienteAxios.post('/articulosimagen',formDataImage)

        newArticle.imageId = imageId.data.img._id;

        //CREATING ARTICLE 
        const response = await clienteAxios.post('/articulos',newArticle);

        console.log('ver',response);

        if (response != null) {
            try{
                
                handleModal('MensajeRegistro',true)
                setMessage(response.data.message)
            }
            catch (error) {
           
                handleModal('MensajeRegistro',true)
                setMessage(response.data.message)
                console.log(error );
            }
        }
        else{
            console.log("error");
        }
    } 
  
    const deleteArticle = async(articuloId)=>{
        try{
            await clienteAxios.delete(`/articulos/${articuloId}`)
            getArticles();
        }
        catch(error){
            console.log(error);
        }
    }
    const sacarArticuloCarrito = async (articlesid)=>{
        try{
            dispatch({
                type: AppConstant.SACAR_CARRITO,
                payload: articlesid
            })
        }
        catch(error){
            console.log(error);
        }
    }
    const purchaseApp = async (data)=>{
        try{
            const response = await clienteAxios.post(`/articulosvendidos`,data)
            dispatch({
                type: AppConstant.SUCCESSFUL_PURCHASE,
                payload: response.data
            })
            handleModal('MensajeRegistro',true)
        }
        catch(error){
            handleModal('MensajeRegistro',true)
            setMessage('Error al realizar la compra')
        }
    }

    const traerComprobantes = async (cliente)=>{
        
        try{
            const respuesta = await clienteAxios.post(`/comprobantes`,{id:cliente._id})
            dispatch({
                type: AppConstant.AGREGAR_COMPROBANTES,
                payload: respuesta.data.comprobantes
            })
        }
        catch(error){
            setMessage('Error al traer los comprobantes');
        }
    }

    const traerComprobantesAdmin = async ()=>{
        try{
            const respuesta = await clienteAxios.get(`/comprobantes`)
            dispatch({
                type: AppConstant.AGREGAR_COMPROBANTES,
                payload: respuesta.data.comprobantes
            })
        }
        catch(error){
            console.log(error);
        }
    }

    const traerMarcas = async ()=>{
        try{
            const respuesta = await clienteAxios.get(`/branches`)
            dispatch({
                type: AppConstant.TRAER_MARCAS,
                payload: respuesta.data.branches
            })
        }
        catch(error){
            console.log(error);
        }
    }

    const getOffers = async ()=>{
        try{
            const respuesta = await clienteAxios.get(`/offer`)
            dispatch({
                type: AppConstant.GET_OFFERS,
                payload: respuesta.data.offers
            })
        }
        catch(error){
            console.log(error);
        }
    }

    const newArticleType = async (data)=>{
        console.log(data)
        try {
            const response = await clienteAxios.post('/tipoarticulos',data);
            setMessage(response.data.message);
            getArticleType();
        } catch (error) {
            console.log(error );
        }
    } 

    const newBranch = async (data)=>{
        console.log('newBranch',data);
        try {
            const response = await clienteAxios.post('/branches',data);
            setMessage(response.data.message);
            traerMarcas();
        } catch (error) {
            handleModal('MensajeRegistro',true)
            setMessage('Error al traer las marcas')
        }
    } 
    const newOffer = async (data)=>{
        console.log('newOffer',data);
        try {
            const response = await clienteAxios.post('/offer',data);
            setMessage(response.data.message);
            getOffers();
        } catch (error) {
            handleModal('MensajeRegistro',true)
            setMessage('Error al traer las ofertas')
        }
    } 

    const getBox = async () => {
        try{
            const respuesta = await clienteAxios.get(`/boxes`)
            console.log(respuesta)
            dispatch({
                type: AppConstant.GET_BOXES,
                payload: respuesta.data.boxes
            })
        }
        catch(error){
            handleModal('MensajeRegistro',true)
            setMessage('Error al traer las cajas')
        }
    }

    return(
        <AppContext.Provider 
        value={{
            login: state.login,
            modalView: state.modalView,
            showModal: state.showModal,
            loadingApp: state.loadingApp,
            message: state.message,
            configuration : state.configuration,
            articleTypeList : state.articleTypeList,
            articles: state.articles,
            currentState:state.currentState,
            comprobantes:state.comprobantes,
            branchList:state.branchList,
            articleView:state.articleView,
            offerList:state.offerList,
            boxesList:state.boxesList,
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
            addArticleView
        }}>{props.children}

        </AppContext.Provider>
    )
}

export default AppState;








