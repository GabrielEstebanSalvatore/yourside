import React, { useState,useContext,Fragment } from 'react'
import Input from '../../components/input';
import Button,{ButtonCancel} from '../../components/button';
import AppContext from '../../context/app/appContext';

const NewArticleType = () => {

    const registerContext = useContext(AppContext);
    const { handleModal,newArticleType,editarTipoArticulo,currentState,current } = registerContext;

    const [localState, setLocalState] = useState({
        modalView:  '', 
        showModal: false,
        idTypeArticle: currentState.name ? currentState.key : null,
        nameTypeArticle : currentState.name ? currentState.name : '',
    })

    const onChange = e => {
        setLocalState({
            ...localState,
            [e.target.name]: e.target.value
        })
    }

    const cancelCurrent = () => {
        return (
            handleModal(localState.modalView, localState.showModal),
            current({}))
    }

    const editCurrent = () => {
        editarTipoArticulo({id:localState.idTypeArticle, name:localState.nameTypeArticle})
        handleModal(localState.modalView, localState.showModal)
        current({})
        setLocalState({
            ...localState,
            idTypeArticle:  null,
            nameTypeArticle :  ''
        })
    }

    const createCurrent = async() => {
        newArticleType({name:localState.nameTypeArticle})
        handleModal('MensajeRegistro', true)
        setLocalState({
            ...localState,
            idTypeArticle:  null,
            nameTypeArticle :  ''
        }) 
    }

    return (
        <div className='login-container'>
            <div className='login-container__header'>
                Tipo Articulos
            </div>
          
            <div className='login-container__body'>
                <Input
                type={'text'}
                value={localState.nameTypeArticle ? localState.nameTypeArticle : '' }
                name={'nameTypeArticle'}
                onChange={onChange}
                title={'Nombre'}
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

export default NewArticleType;

