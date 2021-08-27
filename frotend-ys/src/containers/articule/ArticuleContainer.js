import React, { useState,useContext } from 'react'
import {ButtonItemView} from '../../components/button';
import ContainerGeneral from '../../components/containergeneral';
import AppContext from '../../context/app/appContext';
import ModalContainer from '../modal/ModalContainer'
import ArticuleList from './ArticuleList'
import { Link ,useHistory} from 'react-router-dom';

const ArticuleContainer = () => {

    const appContext = useContext(AppContext);
    const {handleModal,showModal } = appContext;
  
    const [localState, setLocalState] = useState({              
    modalView: 'Articulo', 
    showModal: true})
   
  
    const setShowModal = () => handleModal(localState.modalView, localState.showModal)

    return (
        <ContainerGeneral 
        title={'Listado de Artículos'} 
        button={<ButtonItemView onClick={() => setShowModal()} icon={<i class="fas fa-check-double"></i>} title={' Nuevo Artículo'}></ButtonItemView>}
        modal={showModal != false ? <ModalContainer/> : null}
        list={<ArticuleList/>}
        /> 
    )

}

export default ArticuleContainer;
