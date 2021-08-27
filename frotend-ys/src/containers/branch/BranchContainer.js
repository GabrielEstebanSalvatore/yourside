import React, { useState,useContext } from 'react'
import {ButtonItemView} from '../../components/button';
import ContainerGeneral from '../../components/containergeneral';
import AppContext from '../../context/app/appContext';
import ModalContainer from '../modal/ModalContainer'
import BranchList from './BranchList'

const BranchContainer = () => {

    const appContext = useContext(AppContext);
    const {handleModal,showModal } = appContext;

    const [localState, setLocalState] = useState({              
        modalView: 'Branch', 
        showModal: true})
  
    const setShowModal = () => handleModal(localState.modalView, localState.showModal)

    return (
        <ContainerGeneral 
        title={'Listado de Marcas'} 
        button={<ButtonItemView onClick={() => setShowModal()} icon={<i class="fas fa-check-double"></i>} title={'Nueva Marca'}></ButtonItemView>}
        modal={showModal != false ? <ModalContainer/> : null}
        list={<BranchList/>}
        /> 
    
    )
}

export default BranchContainer;