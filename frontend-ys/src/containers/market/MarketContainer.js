import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../context/app/appContext'
import { useHistory } from 'react-router-dom'
import ModalContainer from '../modal/ModalContainer'
import Card from '../../components/card/Card'
import { ButtonItemView } from '../../components/button'

const MarketContainer = () => {
    const appContext = useContext(AppContext)
    const { addArticleView, handleModal, showModal, articles, getArticles } =
        appContext
    // const clientContext = useContext(ClientContext)
    // const { trolley } = clientContext

    useEffect(() => {
        getArticles()
        // eslint-disable-next-line
    }, [])

    const [localState] = useState({
        modalView: 'Pucharse',
        modalViewArticle: 'ArticuleView',
        showModal: true,
    })

    let history = useHistory()

    // State para iniciar sesión
    // const [state, setState] = useState({
    //     carrito: [],
    // })

    // const agregarCarrito=(articulo)=>{
    //     console.log(articulo)
    //     current(articulo)
    //     setState({
    //         carrito: [...state.carrito, articulo]
    //     })
    // }
    //TODO
    const buyTrolley = () => {
        //agregarArticuloCarrito(trolley)
        history.push('/compra')
    }

    const showItem = (article) => {
        handleModal(localState.modalViewArticle, localState.showModal)
        addArticleView(article)
    }

    //noValidate
    return (
        <div className="mercado">
            <div className="mercado_header">
                <div className="mercado_header_top input-group">
                    <p>Buscar artículo: </p>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                    >
                        Button
                    </button>
                </div>
                <div className="mercado_header_bottom ">
                    <p>Ir a ventas: </p>
                    <ButtonItemView
                        onClick={() => buyTrolley()}
                        icon={<i className="fas fa-check-double"></i>}
                    ></ButtonItemView>
                </div>
            </div>
            <div className="mercado_body">
                {showModal !== false ? <ModalContainer /> : null}
                <div className="row m-0">
                    {articles.map((article) => (
                        <div>
                            {article.image ? (
                                <Card
                                    title={article.name}
                                    path={article.image}
                                    onClickImg={() => showItem(article)}
                                />
                            ) : (
                                <Card title={article.name} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MarketContainer
