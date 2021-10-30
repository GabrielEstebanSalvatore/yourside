import React, { Fragment, useContext } from 'react'
import MainCarousel from './mainCarousel/MainCarousel'
import SecondaryCarousel from './secondaryCarousel/SecondaryCarousel'
import ModalContainer from '../../containers/modal/ModalContainer'
import AppContext from '../../context/app/appContext'

const Homepage = () => {
    const appContext = useContext(AppContext)
    const { showModal } = appContext

    return (
        <Fragment>
            <div className="main">
                {/* <Header /> */}
                <div className="main_top">
                    {showModal !== false ? <ModalContainer /> : null}
                    <div className="main_top_wrapper">
                        <div className="main_top_poligon"></div>
                    </div>
                </div>
                <div className="main_carousel">
                    <MainCarousel />
                </div>
                <div className="main_bottom">
                    <div className="main_bottom_carousel">
                        <SecondaryCarousel />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Homepage
