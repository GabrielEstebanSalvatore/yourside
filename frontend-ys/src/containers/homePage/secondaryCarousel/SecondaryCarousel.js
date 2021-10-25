import React, { useRef, useState, useEffect, useContext } from 'react'
import AppContext from '../../../context/app/appContext'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Animated } from 'react-animated-css'
import { ButtonPrincipal } from '../../../components/button'
// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import '../../../App.scss'

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from 'swiper/core'

// install Swiper modules
SwiperCore.use([Autoplay, Pagination])

const SecondaryCarousel = () => {
    const appContext = useContext(AppContext)
    const { articles, getArticles } = appContext

    useEffect(() => {
        getArticles()
        // eslint-disable-next-line
    }, [])

    const [state, setState] = useState({
        trolley: [],
    })

    const agregarCarrito = (art) => {
        setState({
            carrito: [...state.trolley, art],
        })
    }

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
                delay: 5000,
                disableOnInteraction: true,
            }}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            breakpoints={{
                '@0.00': {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                '@0.75': {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                '@1.00': {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                '@1.50': {
                    slidesPerView: 5,
                    spaceBetween: 1,
                },
            }}
            className="mySwiper"
        >
            {articles &&
                articles.map(
                    (article) =>
                        !article.offer && (
                            <SwiperSlide>
                                <div className="article_carrouselsecundary">
                                    <div className="article_carrouselsecundary_image">
                                        {article.image && (
                                            <img
                                                src={
                                                    `http://localhost:4000/` +
                                                    article.image
                                                }
                                                alt=""
                                            />
                                        )}
                                    </div>

                                    <div className="article_carrouselsecundary_detail">
                                        <div className="article_carrouselsecundary_header">
                                            <h4 class="">{article.name} </h4>
                                        </div>
                                        <div>
                                            <p>
                                                Precio venta:
                                                <strong>
                                                    {' '}
                                                    ${article.sellPrice != null && article.sellPrice }
                                                </strong>
                                            </p>
                                        </div>
                                        <div>
                                        <p>
                                            Tipo:{' '}
                                            <strong>
                                                {article.articleType != null && article.articleType.name }
                                            </strong>
                                        </p>
                                        </div>
                                        <ButtonPrincipal
                                            onClick={() =>
                                                agregarCarrito(article)
                                            }
                                            title={'Comprar'}
                                        ></ButtonPrincipal>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                )}
        </Swiper>
    )
}

export default SecondaryCarousel
