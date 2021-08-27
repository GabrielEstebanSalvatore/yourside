import React, { useState,useContext ,Fragment}  from 'react'
import {Animated} from "react-animated-css";
import { Link ,useHistory} from 'react-router-dom';
import {ButtonNav} from '../../components/button';
import AppContext from '../../context/app/appContext';
import ClientContext from '../../context/client/clientContext';

const HeaderContainer = (props) => {

    const clientContext = useContext(ClientContext);
    const {client,closeSesion } = clientContext;

    const appContext = useContext(AppContext);
    const {handleModal } = appContext;

    const [localState, setLocalState] = useState({              
        modalView: 'Login', 
        showModal: true})
        
    let history = useHistory();

    const setShowModalLogin = () => {
        handleModal(localState.modalView, localState.showModal)
    }
    const setShowModalCerrarSesion = () =>{
        closeSesion()
        history.push('/')
    }
    const setShowModalLocalidad = () => {
        setLocalState({...localState,  modalView: 'Localidad'})
        handleModal(localState.modalView, localState.showModal)}
        
    const setShowModalpais= () => {handleModal(localState.modalView, localState.showModal)}

    return (
        <div className="header-container">
            <div className="header-container_right">
                <Link className="nav-item text-white" to="/">
                    Home 
                </Link>
                    
            </div>
            <div className="header-container_left">
            <Animated animationIn="bounceInLeft" animationInDuration='1000' isVisible={true}>
            {
                    client
                        ?
                        <div className="header-container_body">
                            
                            {client.role === "ADMIN_ROLE" 
                                ?
                                <Fragment> 
                                       <Animated className='d-flex align-items-center'  isVisible={true}>
                                    <div className="mr-3">
                                        <Link className="nav-item text-white" to="/configuracion"><i class="fas fa-wrench"></i>  </Link>
                                        <Link className="nav-item text-white" to="/admin"><i class="fas fa-user-shield"></i> </Link>
                                    </div>
                                    <div className="mr-3">
                                        <ul className="navbar-nav">
                                            <li className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    AMB
                                                </Link>
                                                <div className="dropdown-menu text-white " aria-labelledby="navbarDropdown">
                                                    <Link className="dropdown-item" to="/tipoarticulo">Tipo Articulo</Link>
                                                    <Link className="dropdown-item" to="/branches" >Marcas</Link>
                                                    <Link className="dropdown-item" to="/ofertas" >Ofertas</Link>
                                                    <Link className="dropdown-item" to="/articulo">Articulo</Link>
                                                    <Link className="dropdown-item" to="/mercado" >Mercado</Link>
                                                    <Link className="dropdown-item"  to="/comprobantes" >comprobantes</Link>
                                                    <Link className="dropdown-item"  to="/comprobantesadmin" >comprobantesAdmin</Link>
                                                </div>
                                            </li>
                                        </ul> 
                                    </div>
                                    </Animated>
                                </Fragment> 
                                :
                                <div className="">
                                    <Link className="nav-item"  to="/mercado" >Mercado</Link>
                                    <Link className="nav-item"  to="/comprobantes" >comprobantes</Link>
                                </div>
                            }
                            <div >
                                <ButtonNav title={'  Salir'} onClick={(e) => setShowModalCerrarSesion()}></ButtonNav>
                            </div>
                        </div> 
                        :
                        <div className="">
                            <ButtonNav title={'Ingreso'} onClick={(e) => setShowModalLogin()}>Ingresar</ButtonNav>
                        </div>

            }
                </Animated>
            </div>
        </div>
    )
}

export default HeaderContainer;