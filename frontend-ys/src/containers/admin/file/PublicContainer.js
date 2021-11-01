import React from 'react'
// import Socket from '../../../services/socket'

const PublicContainer = () => {
    // var lblTicket1 = $('#lblTicket1');
    // var lblTicket2 = $('#lblTicket2');
    // var lblTicket3 = $('#lblTicket3');
    // var lblTicket4 = $('#lblTicket4');

    // var lblEscritorio1 = $('#lblEscritorio1');
    // var lblEscritorio2 = $('#lblEscritorio2');
    // var lblEscritorio3 = $('#lblEscritorio3');
    // var lblEscritorio4 = $('#lblEscritorio4');
    // var lblTicket1
    // var lblTicket2
    // var lblTicket3
    // var lblTicket4

    // var lblEscritorio1
    // var lblEscritorio2
    // var lblEscritorio3
    // var lblEscritorio4

    // var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4]
    // var lblEscritorios = [
    //     lblEscritorio1,
    //     lblEscritorio2,
    //     lblEscritorio3,
    //     lblEscritorio4,
    // ]

    // useEffect(() => {
    //     Socket.on('estadoActual', function (data) {
    //         console.log(data)
    //         actualizaHTML(data.ultimos4)
    //     })

    //     Socket.on('ultimos4', function (data) {
    //         actualizaHTML(data.ultimos4)
    //     })

    //     const actualizaHTML = (ultimos4) => {
    //         for (var i = 0; i <= ultimos4.length - 1; i++) {
    //             lblTickets[i].text('Ticket ' + ultimos4[i].numero)
    //             lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio)
    //         }
    //     }
    // })
    // setLocalState({
    //     ...localState,
    //     params:  desck
    // })

    // const [localState, setLocalState] = useState({
    //     params: '',
    //     number: ''
    // })

    return (
        <div className="ticket">
            <table>
                <tr>
                    <td valign="middle" className="ticket-actual">
                        <span id="lblTicket1" className="ticket-actual-numero">
                            Espere...
                        </span>
                        <br />
                        <span
                            id="lblEscritorio1"
                            className="ticket-actual-escritorio"
                        ></span>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <span
                                        id="lblTicket2"
                                        className="ticket-secundario"
                                    ></span>
                                    <br />
                                    <span id="lblEscritorio2"></span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span
                                        id="lblTicket3"
                                        className="ticket-secundario"
                                    ></span>
                                    <br />
                                    <span id="lblEscritorio3"></span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span
                                        id="lblTicket4"
                                        className="ticket-secundario"
                                    ></span>
                                    <br />
                                    <span id="lblEscritorio4"></span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default PublicContainer
