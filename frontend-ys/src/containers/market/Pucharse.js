import React, { useContext } from 'react'
import AppContext from '../../context/app/appContext'
import ClientContext from '../../context/client/clientContext'
import ArticuleList from './ArticuleList'
import { Link, useHistory } from 'react-router-dom'
const Pucharse = () => {
    const appContext = useContext(AppContext)
    const { purchaseApp } = appContext
    const clientContext = useContext(ClientContext)
    const { client, trolley, purchaseClient } = clientContext

    var contador = 0
    let history = useHistory()

    // const [localModal, setLocalModal] = useState({
    //     modalView: '',
    //     showModal: false,
    //     idLocalidad: null,
    //     nombreLocalidad: '',
    //     total: null,
    // })

    const redirect = () => {
        history.push('/comprobantes')
    }

    const ToBuy = async () => {
        await purchaseApp({ trolley, client })
        purchaseClient()
        redirect()
    }

    return (
        <div className="pucharse">
            <h2 className="justify-">Detalle de Compra</h2>
            <div className="row pucharse_client">
                <table className="pucharse_client table">
                    <tbody>
                        <tr>
                            <th>Nombre Cliente: </th>
                            {<td>{client?.name}</td>}
                        </tr>
                        <tr>
                            <th>Dirección Cliente: </th>
                            {<td>{client?.address}</td>}
                        </tr>
                        <tr>
                            <th>Telefono Cliente: </th>
                            {<td>{client?.cell}</td>}
                        </tr>
                    </tbody>
                </table>
            </div>

            <ArticuleList />
            <div className="pucharse_client_total">
                <h2>
                    TOTAL:
                    {
                        (trolley.map(
                            (articulo) => (contador += articulo.sellPrice)
                        ),
                        (<p>{`$ ${contador}`}</p>))
                    }
                </h2>
            </div>
            <div className="pucharse_client_footer">
                <div className="backtomarket">
                    <Link className="btn btn-info" to="/mercado">
                        Seguir comprando
                    </Link>
                </div>
                <div className="pucharse">
                    <button className="btn btn-success" onClick={() => ToBuy()}>
                        Realizar compra
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Pucharse
