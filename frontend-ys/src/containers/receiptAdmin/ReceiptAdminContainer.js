import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/app/appContext'
import ModalContainer from '../modal/ModalContainer'
import ListReceiptAdmin from './ListReceiptAdmin'
import ContainerGeneral from '../../components/containergeneral'

const ReceiptAdminContainer = () => {
    const appContext = useContext(AppContext)
    const { showModal, traerComprobantesAdmin, client, comprobantes } = appContext

    let contador = 0

    useEffect(() => {
        traerComprobantesAdmin(client)
    }, [])

    return (
        <ContainerGeneral
            title={'Listado de Comprobantes Admin'}
            total={
                (comprobantes.map(
                    (comprobante) => (contador += comprobante.price)
                ),
                (<p>{`$ ${contador}`}</p>))
            }
            modal={showModal !== false ? <ModalContainer /> : null}
            list={<ListReceiptAdmin />}
        />
    )
}

export default ReceiptAdminContainer
