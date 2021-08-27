import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../../context/app/appContext';
import { Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'


const BoxList = () => {

    const appContext = useContext(AppContext);
    const { current, handleModal,showModal,getBox,boxesList } = appContext;

    const [localState, setLocalState] = useState({
        modalView: 'box',
        showModal: true
    })

    const setToEdit = (box) => {
        current(box)
        handleModal(localState.modalView, localState.showModal)
    }

    useEffect(() => {
        getBox()
        // eslint-disable-next-line
    }, []);

    const columns = [
        { title: 'N°', dataIndex: 'number' },
        { title: 'Fecha Apertura', dataIndex: 'dateOpen' },
        { title: 'Fecha Cierre', dataIndex: 'dadateCloseta' },
        { title: 'Comprobantes', dataIndex: 'comprobantesAmount' },
        { title: 'Ventas Totales', dataIndex: 'totalSales' },

        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div className="actions_table">
                    <i>
                        <EditOutlined onClick={(e) => setToEdit(record)} style={{ color: 'blue' }} />
                    </i>
                </div>
            )
        }
    ];

    const getRow = () => {
        return boxesList.map((box) => {
            return {
                key: box._id,
                dateOpen: box.openBoxDate,
                dateClose: box.closeBoxDate,
                number: box.number,
                totalSales: box.totalSales,
                comprobantesAmount: box.comprobantesAmount,
            }
        })
    }

    return (

        <div className="tabla">
            <Table
                columns={columns}
                dataSource={getRow()}
            />
        </div>
    )
}

export default BoxList;