import React, { useState, useContext } from 'react'
import { ButtonCancel, ButtonItemView } from '../../components/button'
import AppContext from '../../context/app/appContext'
import ClientContext from '../../context/client/clientContext'

const LoginModal = (props) => {
    //Extraer Turnos de state inicial
    const clientContext = useContext(ClientContext)
    const { registerUser, loginUser } = clientContext
    const registerContext = useContext(AppContext)
    const { handleModal, setMessage } = registerContext

    const [localState, setLocalState] = useState({
        userLoged: false,
    })
    const [localModal] = useState({
        modalView: '',
        showModal: false,
    })
    const [modalIsOpen, setIsOpen] = React.useState(false)
    // State para iniciar sesión
    const [cliente, guardarCliente] = useState({
        name: '',
        address: '',
        email: '',
        cell: '',
        password: '',
        role: '',
    })

    const login = () => {
        if (cliente.email === '' || cliente.password === '') {
            handleModal('MensajeRegistro', true)
            setMessage('Tododos Los Campos son Necesarios')
        } else {
            loginUser({ email: cliente.email, password: cliente.password })
        }
        props.isOpen()
    }

    const registrarme = async () => {
        if (
            cliente.email === '' ||
            cliente.password === '' ||
            cliente.name === '' ||
            cliente.address === '' ||
            cliente.role === '' ||
            cliente.cell === ''
        ) {
            handleModal('MensajeRegistro', true)
            setMessage('Tododos Los Campos son Necesarios')
            return
        } else {
            registerUser(cliente)
            handleModal('', false)
        }
    }

    const onChange = (e) => {
        guardarCliente({
            ...cliente,
            [e.target.name]: e.target.value,
        })
    }

    const setShowModalLogin = () => {
        // return handleModal(localModal.modalView, localModal.showModal)
        console.log('test')
        // setIsOpen(false)
    }

    return (
        <div className="login-container">
            <div className="login-container__header">
                {localState.userLoged === false && <h3>Iniciar sesión</h3>}
                {localState.userLoged === true && <h3>Registro</h3>}
            </div>
            {localState.userLoged === false ? (
                <div className="login-container__body">
                    <label htmlFor="email">Correo</label>
                    <input name="email" title={'Correo'} onChange={onChange} />

                    <label htmlFor="password">password</label>
                    <input
                        name="password"
                        type="password"
                        onChange={onChange}
                    />
                </div>
            ) : (
                <div className="login-container__body">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="roleId">Correo</label>
                                <input
                                    name="email"
                                    className="form-control"
                                    required
                                    onChange={onChange}
                                />

                                <label htmlFor="roleId">password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    onChange={onChange}
                                />

                                <label htmlFor="roleId">Nombre</label>
                                <input
                                    name="name"
                                    className="form-control"
                                    required
                                    placeholder="Nombre Cliente"
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className="col-6">
                            <label htmlFor="roleId">Celular</label>
                            <input
                                name="cell"
                                required
                                className="form-control"
                                placeholder="Celular"
                                onChange={onChange}
                            />

                            <label htmlFor="roleId">Dirección</label>
                            <input
                                name="address"
                                required
                                placeholder="Dirección"
                                onChange={onChange}
                            />

                            <label htmlFor="roleId">Categoría</label>
                            <select id="roleId" name="role" onChange={onChange}>
                                <option defaultValue="" disabled hidden>
                                    Seleccione...
                                </option>
                                <option value="USER_ROLE">USUARIO</option>
                                <option value="ADMIN_ROLE">ADMIN</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
            <div className="login-container__footer">
                {localState.userLoged === false && (
                    <div className="login-container__footerUp">
                        <ButtonItemView
                            title={'Ingresar'}
                            onClick={login}
                            icon={<i className="fas fa-location-arrow"></i>}
                        />
                        <ButtonCancel
                            title={'Cancelar'}
                            onClick={props.isOpen}
                        />
                    </div>
                )}
                {localState.userLoged === true && (
                    <div className="login-container__footerUp">
                        <ButtonItemView
                            title={'Registrarme'}
                            onClick={registrarme}
                        />
                        <ButtonCancel
                            title={'Cancelar'}
                            onClick={props.isOpen}
                        />
                    </div>
                )}
                {localState.userLoged === false && (
                    <div className="login-container__footerDown">
                        <ButtonItemView
                            title={'Registrarme'}
                            onClick={(e) => setLocalState({ userLoged: true })}
                        />
                    </div>
                )}
                {
                    <div className="login-container__footerDown">
                        {localState.userLoged === true && (
                            <ButtonItemView
                                icon={<i className="fas fa-arrow-left"></i>}
                                onClick={(e) =>
                                    setLocalState({ userLoged: false })
                                }
                            />
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default LoginModal
