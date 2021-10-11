import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/app/appContext'
import { Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import ModalContainer from '../../containers/modal/ModalContainer'

const ArticleTypeList = () => {
    const appContext = useContext(AppContext)
    const {
        getArticleType,
        articleTypeList,
        deleteArticleType,
        current,
        handleModal,
        showModal,
    } = appContext

    const [localState, setLocalState] = useState({
        modalView: 'TipoArticulo',
        showModal: true,
    })

    const setToEdit = (tipoArticulo) => {
        current(tipoArticulo)
        handleModal(localState.modalView, localState.showModal)
    }

    useEffect(() => {
        getArticleType()
        // eslint-disable-next-line
    }, [])

    const columns = [
        { title: 'TipoArticulos', dataIndex: 'name' },

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
        if (articleTypeList) {
            return articleTypeList.map((tipoArt) => {
                return {
                    key: tipoArt.id,
                    name: tipoArt.name,
                }
            })
        }
    }

    const setToEliminar = (id) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: '!Si eliminas el tipo de articulo, sera dada de baja!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar',
        }).then((result) => {
            if (result.value) {
                deleteArticleType(id)
                Swal.fire(
                    'Eliminado!',
                    'El tipo de articulo se eliminó correctamente.',
                    'success'
                )
                getArticleType()
            }
        })
    }

    return (
        <div className="tabla">
            <Table columns={columns} dataSource={getRow()} />
        </div>
    )
}

export default ArticleTypeList
