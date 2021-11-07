import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/app/appContext'
import ClientContext from '../../context/client/clientContext'
import ModalContainer from '../modal/ModalContainer'
import ListReceiptIndividual from './ListReceiptIndividual'
import ContainerGeneral from '../../components/containergeneral'
import { useParams } from 'react-router-dom'

const ReceiptIndividualContainer = () => {
    const appContext = useContext(AppContext)
    const { traerComprobante } = appContext

    const clientContext = useContext(ClientContext)
    const { client } = clientContext
    let contador = 0
    let { id } = useParams()
    useEffect(() => {
        traerComprobante(id)
    }, [])

    return (
        <ContainerGeneral
            title={'Detalle de Comprobante'}
            list={<ListReceiptIndividual />}
        />
    )
}

export default ReceiptIndividualContainer
