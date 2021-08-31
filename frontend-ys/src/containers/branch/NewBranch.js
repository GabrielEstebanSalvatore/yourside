import React, { useState, useContext, Fragment } from 'react'
import Button, { ButtonCancel } from '../../components/button'
import AppContext from '../../context/app/appContext'
import Input from '../../components/input'

const NewBranch = () => {
    //Extraer Turnos de state inicial
    const appContext = useContext(AppContext)
    const { handleModal, current, currentState, newBranch, editBranch } =
        appContext

    const [localState, setLocalState] = useState({
        modalView: '',
        showModal: false,
        idBranch: currentState.name ? currentState.key : null,
        BranchName: currentState.name ? currentState.name : '',
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
        editBranch({ id: localState.idBranch, name: localState.BranchName })
        handleModal(localState.modalView, localState.showModal)
        current({})
        setLocalState({
            ...localState,
            idBranch: null,
            BranchName: '',
        })
    }

    const createCurrent = async () => {
        newBranch({ name: localState.BranchName })
        handleModal('MensajeRegistro', true)
        setLocalState({
            ...localState,
            idBranch: null,
            BranchName: '',
        })
    }

    return (
        <div className="login-container">
            <div className="login-container__header">Marca</div>

            <div className="login-container__body">
                <Input
                    type={'text'}
                    value={localState.BranchName ? localState.BranchName : ''}
                    name={'BranchName'}
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

export default NewBranch
