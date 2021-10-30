import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/app/appContext'
import ModalContainer from '../modal/ModalContainer'
import ListReceipt from './ListReceipt'
import ContainerGeneral from '../../components/containergeneral'

const ReceiptContainer = () => {
    const appContext = useContext(AppContext)
    const { showModal, traerComprobantes, client, comprobantes } = appContext

    let contador = 0

    useEffect(() => {
        traerComprobantes(client)
        // eslint-disable-next-line
    }, [])

    return (
        <ContainerGeneral
            title={'Listado de Comprobantes'}
            total={
                (comprobantes.map(
                    (comprobante) => (contador += comprobante.price)
                ),
                (<p>{`$ ${contador}`}</p>))
            }
            modal={showModal !== false ? <ModalContainer /> : null}
            list={<ListReceipt />}
        />
    )
}

export default ReceiptContainer
