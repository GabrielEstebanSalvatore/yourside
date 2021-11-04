import React, { useState } from 'react'
// import Socket from '../../../services/socket'

const DeliveryContainer = ({ history }) => {
    // var searchParams
    var desck

    // useEffect(() => {
    //     Socket.emit('conectado', 'hola desde el cliente')
    //     searchParams = new URLSearchParams(window.location.search)
    //     desck = searchParams.get('escritorio')
    //     setLocalState({
    //         ...localState,
    //         params: desck,
    //     })
    // }, [])

    const [localState] = useState({
        params: '',
        number: '',
    })
    if (!desck == null) {
        history.push('/')
    }

    const getTickets = () => {
        // console.log(localState.params)
        // Socket.emit(
        //     'atenderTicket',
        //     { escritorio: localState.params },
        //     function (resp) {
        //         if (resp === 'No hay tickets') {
        //             console.log(resp)
        //             //label.text(resp);
        //             return
        //         }
        //         setLocalState({
        //             ...localState,
        //             number: resp.numero,
        //         })
        //     }
        // )
    }

    return (
        <div class="col-6">
            <h1>Escritorio {localState.params} </h1>
            <h4>
                Atendiendo a <small>{localState.number}</small>
            </h4>

            <button onClick={getTickets} class="btn btn-primary">
                Atender siguiente ticket
            </button>
        </div>
    )
}

export default DeliveryContainer
