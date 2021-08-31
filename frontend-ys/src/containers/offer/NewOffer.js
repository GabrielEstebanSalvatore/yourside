import React, { useState,useContext,Fragment } from 'react'
import Button,{ButtonCancel} from '../../components/button';
import AppContext from '../../context/app/appContext';
import Input from '../../components/input';

const NewOffer = () => {

      //Extraer Turnos de state inicial
    const appContext = useContext(AppContext);
    const { handleModal,current,currentState,newOffer,editOffer } = appContext;

    const [localState, setLocalState] = useState({
        modalView: '', 
        showModal: false,
        idOffer: currentState.key ? currentState.key : null,
        OfferName: currentState.name ? currentState.name : '',
        percent: currentState.percent ? currentState.percent : null,
        disableDate: currentState.disableDate ? currentState.disableDate :null
    })

    const onChange = e => {
        setLocalState({
            ...localState,
            [e.target.name]: e.target.value
        })
    }

    const cancelCurrent = () => {
        return (
            handleModal(localState.modalView, localState.showModal ))
    }

    const editCurrent = () => {
        editOffer({id:localState.idOffer, name:localState.OfferName, disableDate:localState.disableDate , percent: localState.percent})
        handleModal(localState.modalView, localState.showModal)
        current({})
        setLocalState({
            ...localState,
            idOffer:  null,
            OfferName :  '',
            percent:null,
            disableDate:null
        })
    }

    const createCurrent = async() => {
        newOffer({name:localState.OfferName, percent:localState.percent , disableDate:localState.disableDate})
        handleModal('MensajeRegistro', true)
        setLocalState({
            ...localState,
            idOffer:  null,
            OfferName :  '',
            percent:null,
            disableDate:null
        }) 
    }

    return (
        <div className='login-container'>

            <div className='login-container__header'>
                Ofertas
            </div>

            <div className='login-container__body'>
                <Input
                type={'text'}
                value={localState.OfferName ? localState.OfferName : '' }
                name={'OfferName'}
                onChange={onChange}
                title={'Nombre'}
                />

                <Input
                type={'number'}
                value={localState.percent ? localState.percent : '' }
                name={'percent'}
                onChange={onChange}
                title={'Porcentaje'}
                />

                <Input
                type={'date'}
                value={localState.disableDate ? localState.disableDate : '' }
                name={'disableDate'}
                onChange={onChange}
                title={'Fecha de expiración'}
                />
            </div>

            <div className='login-container__footer'>
                <div className='login-container__footerUp'>
                    <Fragment>
                        {
                            currentState.name != null
                            ? <Button title={'Aceptar'} onClick={editCurrent} />
                            : <Button title={'Aceptar'} onClick={createCurrent} />
                        }
                        <ButtonCancel title={'Cancelar'} onClick={(e) => cancelCurrent()} />
                    </Fragment>
                </div>
            </div>
        </div>
    )

}

export default NewOffer;

