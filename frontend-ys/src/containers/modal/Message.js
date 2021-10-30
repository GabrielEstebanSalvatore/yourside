import React, { useState, useContext } from 'react'
import { ButtonItemView } from '../../components/button/index'
import AppContext from '../../context/app/appContext'

const Message = () => {
    //Extraer Turnos de state inicial
    const proyectosContext = useContext(AppContext)
    const { handleModal, message, setMessage } = proyectosContext

    const [localState] = useState({
        message: '',
        modalView: '',
        showModal: false,
    })

    const setShowModalLogin = () => {
        handleModal(localState.modalView, localState.showModal)
        setMessage('')
    }

    return (
        <div className="Mensaje-container">
            <div className="Mensaje-container__header">
                <h3>Mensaje</h3>
            </div>

            <div className="Mensaje-container__body">
                <p>{message}</p>
            </div>
            <div className="Mensaje-container__footer">
                <ButtonItemView
                    title={'Aceptar'}
                    onClick={(e) => setShowModalLogin()}
                />
            </div>
        </div>
    )
}

export default Message
