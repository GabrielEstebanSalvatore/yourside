import React, { Fragment, useContext, useEffect,useState } from 'react'
import { ButtonItemView, ButtonCancel } from '../../components/button';
import AppContext from '../../context/app/appContext';
import ModalContainer from '../modal/ModalContainer'
import { ContainerAdmin } from '../../components/containergeneral';
import { useHistory } from 'react-router-dom';
import BoxContainer from './box/BoxContainer'
import DeskContainer from './file/DeskContainer'
import Socket from '../../services/socket'

const AdminContainer = () => {

    const appContext = useContext(AppContext);
    const { handleModal, showModal, configuration } = appContext;
    
    const [localState, setLocalState] = useState({view: 'Box'})

    useEffect(() => {
       
        Socket.emit('conectado', 'hola desde el cliente')
    }, [])

    let history = useHistory();
    const redirect = () => {

        history.push('/')
    }

    const renderView = ()=>{

        switch (localState.view) {
            case 'Box':
                return <BoxContainer/>
            case 'File':
                return <DeskContainer/>
            default:
                return null;
        }
    }
    const onClickBox=(view)=>{
        setLocalState({
            ...localState,
            view:  view
        })
    }
   


    return (
        <ContainerAdmin
            className={"adminContainer"}
            modal={showModal !== false ? <ModalContainer /> : null}
            headerName={configuration == {} ? "" : configuration.name}
            headerSection={"ADMIN"}
            body={

             <div className="adminContainer_body_administration">
                <div className="adminContainer_body_administration_container">
                    {
                        renderView()
                    }
                    
                </div>
                <div className="adminContainer_body_administration_menu">
                    <div className="admin_body_administration_menu_title">
                        Menu
                    </div>
                    <div className="adminContainer_body_administration_menu_buttons">
                        <ButtonItemView title="Caja" onClick={(e) =>onClickBox('Box')} ></ButtonItemView>
                        <ButtonItemView title="Cola" onClick={(e) =>onClickBox('File')} ></ButtonItemView>
                        <ButtonItemView title="" ></ButtonItemView>
                        <ButtonItemView title="" ></ButtonItemView>
                    </div>

                </div>

             </div>
            }

            footer={
                <Fragment>
                    {/* <ButtonItemView type="submit" title="Aceptar"></ButtonItemView>
                    <ButtonCancel title="Cancelar" onClick={redirect}></ButtonCancel> */}
                </Fragment>
            }
        />

    )

}

export default AdminContainer;