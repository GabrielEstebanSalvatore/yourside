import React, { useContext,useEffect } from 'react'
import AppContext from '../../context/app/appContext'
import ClientContext from '../../context/client/clientContext'
import { Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'

const ArticleList = () => {
    const appContext = useContext(AppContext)
    const { sacarArticuloCarrito } = appContext

    const clientContext = useContext(ClientContext)
    const { trolley, client, authenticatedClient,deleteArticleToSesionTrolley } = clientContext

    useEffect(() => {
    }, [trolley])

    const deleteArticle = (articleId) => {
        deleteArticleToSesionTrolley(articleId)
    }

    const columns = [
        { title: 'Nombre', dataIndex: 'name' },
        { title: 'Tipo', dataIndex: 'articleType' },
        { title: 'Precio', dataIndex: 'sellPrice' },

        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div className="actions_table">
                    <i>
                        <DeleteOutlined
                            onClick={() => onClickDelete(record)}
                            style={{ color: 'red' }}
                        />
                    </i>
                </div>
            ),
        },
    ]

    const getRow = () => {
        return trolley.map((article) => {
            return {
                key: article.id,
                name: article.name,
                articleType: article.articleType.name,
                sellPrice: article.sellPriceOffer ? 
                           article.sellPriceOffer:
                           article.sellPrice
            }
        })
    }

    const onClickDelete = (data) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: '!Si eliminas el artículo, será dado de baja!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar',
        }).then((result) => {
            if (result.value) {
                deleteArticle(data.key)
                Swal.fire(
                    'Eliminado!',
                    'El artículo se eliminó correctamente.',
                    'success'
                )
            }
        })
    }
    return (
        <div className="tabla">
            <Table columns={columns} dataSource={getRow()} />
        </div>
    )
}

export default ArticleList
