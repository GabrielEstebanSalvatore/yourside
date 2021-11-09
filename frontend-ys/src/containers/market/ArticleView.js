import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../context/app/appContext'
import ClientContext from '../../context/client/clientContext'
import { ButtonItemView } from '../../components/button'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const ArticleView = () => {
    
    const appContext = useContext(AppContext)
    const { handleModal, currentEdit, current, articleView } = appContext
    const clientContext = useContext(ClientContext)
    const { addArticleToSesionTrolley } = clientContext

    const [localState] = useState({
        modalView: 'Pucharse',
        showModal: true,
        modalViewCancel: '',
        showModalCancel: false,
        current: currentEdit ? currentEdit : null,
    })

    const cancelModal = () => {
        handleModal(localState.modalViewCancel, localState.showModalCancel)
        current({})
    }
    const notify = () => toast('Artículo agregado al carrito')
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))
    const addArticleTrolley = async () => {
        notify()

        await delay(2000)
        handleModal(localState.modalViewCancel, localState.showModalCancel)
        addArticleToSesionTrolley(articleView)
    }

    //noValidate
    return (
        <div className="articleView">
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="articleView_wrapper">
                <div className="articleView_card">
                    <div className="articleView_card_img">
                        <img
                            src={`http://localhost:4000/` + articleView.image}
                            alt=""
                        />
                    </div>
                    <div className="articleView_card_details">
                        <h2 className="precion_ahora">{articleView.name}</h2>

                        {articleView.offer ? (
                            <div>
                                {' '}
                                <h4 className="precion_ahora">
                                    ${articleView.sellPriceOffer} 
                                    ( {articleView.offer} % {' '} de Descuento)
                                </h4>{' '}
                            </div>
                        ) : (
                            <h4 className="precion_ahora">
                                ${articleView.sellPrice}{' '}
                            </h4>
                        )}

                    </div>
                    <div className="articleView_card_icons">
                        <div>
                            <ButtonItemView
                                onClick={cancelModal}
                                icon={<i className="fas fa-undo-alt"></i>}
                            ></ButtonItemView>
                        </div>
                        <div>
                            <ButtonItemView
                                onClick={addArticleTrolley}
                                icon={<i className="fas fa-check"></i>}
                            ></ButtonItemView>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleView
