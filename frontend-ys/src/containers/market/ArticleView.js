import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../context/app/appContext'
import ClientContext from '../../context/client/clientContext'
import { ButtonItemView } from '../../components/button'

const ArticleView = () => {
    const appContext = useContext(AppContext)
    const { handleModal, currentEdit, current, articleView } = appContext
    const clientContext = useContext(ClientContext)
    const { addArticleToSesionTrolley, trolley } = clientContext

    useEffect(() => {
        // eslint-disable-next-line
    }, [])

    const [localState, setLocalState] = useState({
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

    const addArticleTrolley = () => {
        console.log('1')

        // if(trolley)
        // {
        //     var counter = 0;

        //     articleView.amount = 0;

        //     trolley.forEach(element => {

        //         if(element._id == articleView._id)
        //         {
        //             //console.log(articleView.amount, element.amount +1 )
        //             counter++
        //         }
        //     });

        //     articleView.amount += counter

        //     console.log('3')
        // }

        addArticleToSesionTrolley(articleView)
    }

    //noValidate
    return (
        <div className="articleView">
            <div className="articleView_wrapper">
                <div className="articleView_card">
                    <div className="articleView_card_img">
                        <img
                            src={
                                `http://localhost:4000/` +
                                articleView.image.path
                            }
                            alt=""
                        />
                    </div>
                    <div className="articleView_card_details">
                        <h2 className="precion_ahora">{articleView.name}</h2>

                        {articleView.offer ? (
                            <div>
                                {' '}
                                <h4 className="precion_ahora">
                                    ${articleView.sellPriceOffer} (%{' '}
                                    {articleView.offer.percent} de Descuento)
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
                                icon={<i class="fas fa-undo-alt"></i>}
                            ></ButtonItemView>
                        </div>
                        <div>
                            <ButtonItemView
                                onClick={addArticleTrolley}
                                icon={<i class="fas fa-check"></i>}
                            ></ButtonItemView>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleView
