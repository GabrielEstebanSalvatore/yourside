import React, { useContext } from 'react'
import LoginConteiner from '../login/LoginContainer'
import NewArticleType from '../articleType/NewArticleType'
import NewArticule from '../articule/NewArticule'
import Pucharse from '../market/Pucharse'
import Brand from '../brand/NewBrand'
import ArticleView from '../market/ArticleView'
import Offer from '../offer/NewOffer'

import Message from './Message'
import AppContext from '../../context/app/appContext'

import { Animated } from 'react-animated-css'

const ModalContainer = () => {
    const appContext = useContext(AppContext)
    const { modalView } = appContext

    const renderModalView = () => {
        switch (modalView) {
            case 'Login':
                return <LoginConteiner />
            case 'MensajeRegistro':
                return <Message />
            case 'TipoArticulo':
                return <NewArticleType />
            case 'Article':
                return <NewArticule />
            case 'Pucharse':
                return <Pucharse />
            case 'Brand':
                return <Brand/>
            case 'ArticuleView':
                return <ArticleView />
            case 'Offers':
                return <Offer />
            default:
                return null
        }
    }

    return (
        <div className="modal-container">
            <div className="modal-container__header"></div>
            <div className="modal-container__body">
                <Animated isVisible={true}>{renderModalView()}</Animated>
            </div>
        </div>
    )
}

export default ModalContainer
