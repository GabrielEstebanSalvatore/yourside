import React, { useState, useContext, Fragment } from 'react'
import Button, { ButtonCancel } from '../../components/button'
import AppContext from '../../context/app/appContext'
import Input from '../../components/input'

const NewBrand = () => {
    //Extraer Turnos de state inicial
    const appContext = useContext(AppContext)
    const { handleModal, current, currentState, newBrand, editBrand } =
        appContext

    const [localState, setLocalState] = useState({
        modalView: '',
        showModal: false,
        idBrand: currentState.name ? currentState.key : null,
        BrandName: currentState.name ? currentState.name : '',
    })

    const onChange = (e) => {
        setLocalState({
            ...localState,
            [e.target.name]: e.target.value,
        })
    }

    const cancelCurrent = () => {
        return handleModal(localState.modalView, localState.showModal)
    }

    const editCurrent = () => {
        editBrand({ id: localState.idBrand, name: localState.BrandName })
        handleModal(localState.modalView, localState.showModal)
        current({})
        setLocalState({
            ...localState,
            idBrand: null,
            BrandName: '',
        })
    }

    const createCurrent = async () => {
        newBrand({ name: localState.BrandName })
        handleModal('MensajeRegistro', true)
        setLocalState({
            ...localState,
            idBrand: null,
            BrandName: '',
        })
    }

    return (
        <div className="login-container">
            <div className="login-container__header">Marca</div>

            <div className="login-container__body">
                <Input
                    type={'text'}
                    value={localState.BrandName ? localState.BrandName : ''}
                    name={'BrandName'}
                    onChange={onChange}
                    title={'Nombre'}
                />
            </div>

            <div className="login-container__footer">
                <div className="login-container__footerUp">
                    <Fragment>
                        {currentState.name != null ? (
                            <Button title={'Aceptar'} onClick={editCurrent} />
                        ) : (
                            <Button title={'Aceptar'} onClick={createCurrent} />
                        )}
                        <ButtonCancel
                            title={'Cancelar'}
                            onClick={(e) => cancelCurrent()}
                        />
                    </Fragment>
                </div>
            </div>
        </div>
    )
}

export default NewBrand
