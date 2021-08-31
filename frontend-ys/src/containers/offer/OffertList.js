import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/app/appContext';
import { Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

const OffertList = () => {

    const appContext = useContext(AppContext);
    const { handleModal, getOffers, offerList, current, deleteOffer } = appContext;

    const [localState, setLocalState] = useState({
        modalView: 'Offers',
        showModal: true
    })

    const setToEdit = (offer) => {
        current(offer)
        handleModal(localState.modalView, localState.showModal)
    }

    useEffect(() => {
        getOffers()
        // eslint-disable-next-line
    }, []);

    const columns = [
        { title: 'Nombre', dataIndex: 'name' },
        { title: 'Porcentaje', dataIndex: 'percent' },
        { title: 'Expiración', dataIndex: 'disableDate' },

        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div className="actions_table">
                    <i>
                        {
                            record.name != null 
                            ? <DeleteOutlined onClick={() => setToEliminar(record.key)} style={{ color: 'red' }} />
                            : ""
                        }
                    </i>
                    <i>
                        <EditOutlined onClick={(e) => setToEdit(record)} style={{ color: 'blue' }} />
                    </i>
                </div>
            )
        }
    ];

    const getRow = () => {
        return offerList.map((offerList) => {
            return {
                key: offerList._id,
                name: offerList.name,
                percent: offerList.percent,
                disableDate: offerList.disableDate,
            }
        })
    }

    const setToEliminar = (id) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "!Si eliminas la oferta, sera dada de baja!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.value) {
                deleteOffer(id)
                Swal.fire(
                    'Eliminado!',
                    'La oferta se eliminó correctamente.',
                    'success'
                )
            }
            getOffers()
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

export default OffertList;