import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../context/app/appContext'
import { useHistory } from 'react-router-dom'
import ModalContainer from '../modal/ModalContainer'
import Card from '../../components/card/Card'
import { ButtonItemView } from '../../components/button'
import Modal from 'react-modal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ClientContext from '../../context/client/clientContext'

//Modal Style
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
    },
}
Modal.setAppElement('#root')
const MarketContainer = () => {
    const clientContext = useContext(ClientContext)
    const { addArticleToSesionTrolley } = clientContext
    const appContext = useContext(AppContext)
    const {
        addArticleView,
        handleModal,
        showModal,
        articles,
        getArticles,
        articleView,
    } = appContext
    // const clientContext = useContext(ClientContext)
    // const { trolley } = clientContext
    const [modalIsOpen, setIsOpen] = React.useState(false)
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
        openModal()
        // handleModal(localState.modalViewArticle, localState.showModal)
        addArticleView(article)
    }

    function openModal() {
        setIsOpen(true)
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00'
    }

    function closeModal() {
        setIsOpen(false)
    }
    const notify = () => toast.success('Artículo agregado al carrito')
    const addArticleTrolley = async () => {
        addArticleToSesionTrolley(articleView)
        notify()
        closeModal()
    }

    return (
        <div className="mercado">
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
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="articleView">
                    {/* <ToastContainer
                        position="bottom-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    /> */}
                    <div className="articleView_wrapper">
                        <div className="articleView_card">
                            <div className="articleView_card_img">
                                <img
                                    src={
                                        `http://localhost:4000/` +
                                        articleView.image
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="articleView_card_details">
                                <h2 className="precion_ahora">
                                    {articleView.name}
                                </h2>

                                {articleView.offer ? (
                                    <div>
                                        {' '}
                                        <h4 className="precion_ahora">
                                            ${articleView.sellPriceOffer} (%{' '}
                                            {articleView.offer.percent} de
                                            Descuento)
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
                                        onClick={closeModal}
                                        icon={
                                            <i className="fas fa-undo-alt"></i>
                                        }
                                        title="Volver atrás"
                                    ></ButtonItemView>
                                </div>
                                <div>
                                    <ButtonItemView
                                        onClick={addArticleTrolley}
                                        icon={<i className="fas fa-check"></i>}
                                        title="Comprar"
                                    ></ButtonItemView>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="mercado_header">
                {/* <div className="mercado_header_top input-group">
                    <p>Buscar artículo: </p>
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                    >
                        Buscar
                    </button>
                </div> */}
            </div>
            <div className="mercado_body">
                {showModal !== false ? <ModalContainer /> : null}
                <div className="row m-0">
                    {articles.map((article, i) => (
                        <div key={i} style={{ cursor: 'pointer' }}>
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
