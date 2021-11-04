import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/app/appContext'
import ClientContext from '../../context/client/clientContext'
import ModalContainer from '../modal/ModalContainer'
import ListReceipt from './ListReceipt'
import ContainerGeneral from '../../components/containergeneral'

const ReceiptContainer = () => {
    const appContext = useContext(AppContext)
    const { showModal, traerComprobantes, comprobantes } = appContext

    const clientContext = useContext(ClientContext)
    const { client } = clientContext
    let contador = 0

    useEffect(() => {
        if (client) {
            traerComprobantes(client)
        }
    }, [client])

    return (
        <ContainerGeneral
            title={'Listado de Comprobantes'}
            total={
                (comprobantes.map(
                    (comprobante, i) => (contador += comprobante.price)
                ),
                (<p>{`$ ${contador}`}</p>))
            }
            modal={showModal !== false ? <ModalContainer /> : null}
            list={<ListReceipt />}
        />
    )
}

export default ReceiptContainer
