import React, { useRef, useState, useEffect, useContext } from 'react'
import AppContext from '../../../context/app/appContext'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { ButtonPrincipal } from '../../../components/button'

// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import '../../../App.scss'

// import Swiper core and required modules
import SwiperCore, {
    Autoplay,
    Pagination,
    Navigation,
    Parallax,
} from 'swiper/core'

SwiperCore.use([Autoplay, Pagination, Navigation, Parallax])

const MainCarousel = () => {
    const appContext = useContext(AppContext)
    const { articles, getArticles } = appContext

    useEffect(() => {
        getArticles()
        // eslint-disable-next-line
    }, [])

    // State para iniciar sesión
    const [state, setState] = useState({
        trolley: [],
    })

    const addTrolley = (article) => {
        console.log(article)
        setState({
            trolley: [...state.trolley, article],
        })
    }

    return (
        <Swiper
            centeredSlides={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: true,
            }}
            speed={1000}
            parallax={true}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            navigation={false}
            className="mySwiper"
        >
            <div
                slot="container-start"
                className="parallax-bg"
                data-swiper-parallax="-23%"
            ></div>
            {articles.map(
                (article) =>
                    article.offer && (
                        <SwiperSlide>
                            <div className="article_carrousel ">
                                <div
                                    className="article_carrousel_image"
                                    data-swiper-parallax="-500"
                                    data-swiper-parallax-opacity="0"
                                >
                                    {
                                        article.image && (
                                            <img
                                                src={
                                                    `http://localhost:4000/` + article.image
                                                }
                                                alt=""
                                            />
                                        ) //style={{ height: "300px", width: "400px" }}
                                    }
                                </div>

                                <div className="article_carrousel_detail">
                                    <div
                                        className="article_carrousel_header"
                                        data-swiper-parallax="-250"
                                        data-swiper-parallax-opacity="0"
                                    >
                                        <h2 className="article_carrousel_header_titulo">
                                            {article.name}{' '}
                                        </h2>
                                        <div
                                            data-swiper-parallax="-350"
                                            data-swiper-parallax-opacity="0"
                                        >
                                            antes:
                                            <p className="precion_antes">
                                                $<h2>{article.sellPrice}</h2>
                                            </p>
                                        </div>
                                        {/* <p>Tipo: <strong>{articulo.articleType.name}</strong></p> */}
                                    </div>
                                    <div
                                        data-swiper-parallax="-400"
                                        data-swiper-parallax-opacity="0"
                                    >
                                        <div
                                            data-swiper-parallax="-550"
                                            data-swiper-parallax-opacity="0"
                                        >
                                            ahora:
                                            <p className="precion_ahora">
                                                $
                                                <h2>
                                                    {article.sellPriceOffer}
                                                </h2>
                                            </p>
                                            <p className="descuento">
                                                % {article.offer.percent} de
                                                Descuento
                                            </p>
                                        </div>
                                        <div
                                            className="d-flex justify-content-center"
                                            data-swiper-parallax="-750"
                                            data-swiper-parallax-opacity="0"
                                        >
                                            <ButtonPrincipal
                                                onClick={() =>
                                                    addTrolley(article)
                                                }
                                                title={'Comprar'}
                                            >
                                                {' '}
                                            </ButtonPrincipal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
            )}
        </Swiper>
    )
}

export default MainCarousel
