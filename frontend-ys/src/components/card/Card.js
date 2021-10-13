import React from 'react'
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
                        )
                    }
                </div>
                <div className="card_product_body">
                    <h5>Card title {title}</h5>
                    <p>Some quick example .</p>
                </div>
            </div>
        </Animated>
    )
}

export default Card
