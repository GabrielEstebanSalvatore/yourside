import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/app/appContext'

import { Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'

const BrandList = () => {
    const appContext = useContext(AppContext)
    const { handleModal, getBrands, brandList, current, deleteBrand } =
        appContext

    const [localState, setLocalState] = useState({
        modalView: 'Brand',
        showModal: true,
    })

    const setToEdit = (brand) => {
        current(brand)
        handleModal(localState.modalView, localState.showModal)
    }

    useEffect(() => {
        getBrands()
        // eslint-disable-next-line
    }, [])

    const columns = [
        { title: 'Marca', dataIndex: 'name' },

        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div className="actions_table">
                    <i>
                        <DeleteOutlined
                            onClick={() => setToEliminar(record.key)}
                            style={{ color: 'red' }}
                        />
                    </i>
                    <i>
                        <EditOutlined
                            onClick={(e) => setToEdit(record)}
                            style={{ color: 'blue' }}
                        />
                    </i>
                </div>
            ),
        },
    ]

    const getRow = () => {
        return brandList.map((brand) => {
            return {
                key: brand.id,
                name: brand.name,
            }
        })
    }

    const setToEliminar = (id) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: '!Si eliminas la marca, sera dada de baja!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar',
        }).then((result) => {
            if (result.value) {
                deleteBrand(id)
                Swal.fire(
                    'Eliminado!',
                    'La marca se eliminó correctamente.',
                    'success'
                )
            }
            getBrands()
        })
    }

    return (
        <div className="tabla">
            <Table columns={columns} dataSource={getRow()} />
        </div>
    )
}

export default BrandList
