import React, { useState, useContext, Fragment } from 'react'
import AppContext from '../../context/app/appContext';
import { useHistory } from 'react-router-dom';
import { ButtonCancel, ButtonSubmit, ButtonItemView } from '../../components/button';
import { ContainerAdmin } from '../../components/containergeneral';
import ModalContainer from '../../containers/modal/ModalContainer'

const ConfigurationContainer = () => {

    const appContext = useContext(AppContext);
    const { newConfiguration, configuration, editConfiguration, showModal, handleModal } = appContext;

    let history = useHistory();

    const [sistemConfiguration, saveSistemConfiguration] = useState({
        name: configuration.name ? configuration.name : '',
        adminCode: configuration.name ? configuration.adminCode : '',
        demo: configuration.name ? configuration.demo : null,
        lastSellName: configuration.name ? configuration.lastSellName : null,
        useDecimal: configuration.name ? configuration.useDecimal : null,
        cellPhone: configuration.name ? configuration.cellPhone : null,
        address: configuration.name ? configuration.address : null,
        id: configuration.name ? configuration._id : null
    });

    const onChange = e => {
        saveSistemConfiguration({
            ...sistemConfiguration,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        newConfiguration(sistemConfiguration)
        handleModal('MensajeRegistro', true)
        saveSistemConfiguration({
            ...sistemConfiguration,
            name: null,
            adminCode: null,
            demo: null,
            lastSellName: null,
            useDecimal: null,
            address: null,
            cellPhone: null,
        })
    }

    const onSubmitUpdate = e => {
        e.preventDefault();
        editConfiguration(sistemConfiguration)
        handleModal('MensajeRegistro', true)
    }

    const redirect = () => {
        history.push('/')
    }

    return (
        <ContainerAdmin
            modal={showModal !== false ? <ModalContainer /> : null}
            headerName={configuration == {} ? "" : configuration.name}
            headerSection={"CONFIGURACIONES"}
            body={
                <div className="admin_body_configuration">

                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            value={configuration.name ? sistemConfiguration.name : null}
                            required
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Codigo Admin:</label>
                        <input type="text"
                            className="form-control"
                            name="adminCode"
                            value={configuration.adminCode ? sistemConfiguration.adminCode : null}
                            required
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Demo:</label>
                        <input type="number"
                            className="form-control"
                            name="demo"
                            value={configuration.demo ? sistemConfiguration.demo : null}
                            required
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Ultimo número de venta:</label>
                        <input type="number"
                            className="form-control"
                            name="lastSellName"
                            value={configuration.lastSellName ? sistemConfiguration.lastSellName : null}
                            required
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Usa decimal:</label>
                        <input type="number"
                            className="form-control"
                            name="useDecimal"
                            value={configuration.useDecimal ? sistemConfiguration.useDecimal : null}
                            required
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Direccion:</label>
                        <input type="text"
                            className="form-control"
                            name="address"
                            value={configuration.address ? sistemConfiguration.address : null}
                            required
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Telefono:</label>
                        <input type="text"
                            className="form-control"
                            name="cellPhone"
                            value={configuration.cellPhone ? sistemConfiguration.cellPhone : null}
                            required
                            onChange={onChange}
                        />
                    </div>
                </div>
            }

            footer={
                <Fragment>
                    {
                        configuration.name
                            ? <ButtonItemView type="submit" onClick={onSubmit} title="Aceptar"></ButtonItemView>
                            : <ButtonItemView type="submit" onClick={onSubmitUpdate} title="Aceptar"></ButtonItemView>
                    }
                    <ButtonCancel title="Cancelar" onClick={redirect}></ButtonCancel>

                </Fragment>
            }

        />

    )
}

export default ConfigurationContainer;