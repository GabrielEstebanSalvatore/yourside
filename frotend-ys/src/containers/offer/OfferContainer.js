import React, { useState,useContext } from 'react'
import {ButtonItemView} from '../../components/button';
import ContainerGeneral from '../../components/containergeneral';
import AppContext from '../../context/app/appContext';
import ModalContainer from '../modal/ModalContainer'
import OffertList from './OffertList'

const OfferContainer = () => {

    const appContext = useContext(AppContext);
    const {handleModal,showModal } = appContext;

    const [localState, setLocalState] = useState({              
        modalView: 'Ofertas', 
        showModal: true})
  
    const setShowModal = () => handleModal(localState.modalView, localState.showModal)

    return (
        <ContainerGeneral 
        title={'Listado de Ofertas'} 
        button={<ButtonItemView onClick={() => setShowModal()} icon={<i class="fas fa-check-double"></i>} title={'Nueva Oferta'}></ButtonItemView>}
        modal={showModal != false ? <ModalContainer/> : null}
        list={<OffertList/>}
        /> 
    
    )
}

export default OfferContainer;