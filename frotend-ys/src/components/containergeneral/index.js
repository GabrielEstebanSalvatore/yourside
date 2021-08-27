import React, {useContext,useEffect} from 'react';

const ContainerGeneral = ({title, button, list, modal,total}) => {

    return ( 
        <div className="container_general">
            <h2 >{title} </h2>
            {button}
            {
                total &&     
                <div className="container_general_total">
                    <h2>
                        TOTAL:
                        {
                            total
                        }
                    </h2>
                </div>
            }
            {modal}
            {list}
        </div>
    );
}

export const ContainerAdmin = ({headerName,headerSection,body,footer,modal, className="admin"}) => {
    return (
        <div className={className}>
            <div className="admin_container">
                {modal}
                <div className="admin_header_wrapper">
                    <div className="admin_header">
                        {headerName} - {headerSection}
                    </div>
                </div>
                <div className="admin_body">
                    {body}
                </div>
                <div className="admin_footer">
                    {footer}
                </div>
            </div>
        </div>
    )
}

export default ContainerGeneral;