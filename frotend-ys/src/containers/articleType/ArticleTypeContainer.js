import React, { useState,useContext } from 'react'
import {ButtonItemView} from '../../components/button';
import ContainerGeneral from '../../components/containergeneral';
import AppContext from '../../context/app/appContext';
import ModalContainer from '../modal/ModalContainer'
import ArticleTypeList from './ArticleTypeList'

const ArticleTypeContainer = () => {

    const appContext = useContext(AppContext);
    const {handleModal,showModal } = appContext;
  
    const [localState, setLocalState] = useState({              
    modalView: 'TipoArticulo', 
    showModal: true})

    const setShowModal = () => {handleModal(localState.modalView, localState.showModal)}
    return (
        <ContainerGeneral 
        title={'Listado de Tipos de Artículos'} 
        button={<ButtonItemView onClick={() => setShowModal()} icon={<i class="fas fa-check-double"></i>} title={' Nuevo Tipo Artículo'}></ButtonItemView>}
        modal={showModal != false ? <ModalContainer/> : null}
        list={<ArticleTypeList/>}
        /> 
    )

}

export default ArticleTypeContainer;