import React from 'react'
import { ButtonPrincipal } from '../button'
import { Animated } from 'react-animated-css'

const Card = ({ title, path, onClick, onClickImg }) => {
    return (
        <Animated isVisible={true}>
            <div className="card_product">
                <div className="card_product_overflow" onClick={onClick}>
                    {
                        path && (
                            <img
                                src={`http://localhost:4000/` + path}
                                className="card_product_img"
                                alt=""
                                onClick={onClickImg}
                            />
                        ) //style={{ height: "300px", width: "400px" }}
                    }
                </div>
                <div className="card_product_body">
                    <h5>Card title {title}</h5>
                    <p>Some quick example .</p>
                    {/* <ButtonPrincipal title={'Comprar'} onClick={onClick}/> */}
                </div>
            </div>
        </Animated>
    )
}

export default Card
