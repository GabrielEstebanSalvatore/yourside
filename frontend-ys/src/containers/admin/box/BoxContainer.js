import React from 'react'
import BoxList from './BoxList'

const BoxContainer = () => {
    return (
        <div className="box-container">
            <div className="box-container_header"></div>
            <div className="box-container_body">
                <div>
                    <BoxList></BoxList>
                </div>
            </div>
        </div>
    )
}

export default BoxContainer
