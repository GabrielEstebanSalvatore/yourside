import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/app/appContext'
import { Input, Button, Space } from 'antd'
import { Table } from 'antd'
import { DeleteOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'

const ArticuleList = () => {
    const appContext = useContext(AppContext)
    const { handleModal, getArticles, articles, deleteArticle, current } =
        appContext

    const [localState, setLocalState] = useState({
        modalView: 'Article',
        showModal: true,
    })

    const editArticle = (article) => {

        current(article)
        handleModal(localState.modalView, localState.showModal)
    }

    useEffect(() => {
        getArticles()
        // eslint-disable-next-line
    }, [articles])

    const [pagination] = useState({
        bottom: 'bottomCenter',
    })

    const [buscar, setBuscar] = useState({
        searchText: '',
        searchedColumn: '',
    })

    const searchInTable = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),

        render: (text) =>
            buscar.searchedColumn === dataIndex ? (
                <Button
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[buscar.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    })

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
    }

    const handleReset = (clearFilters) => {
        clearFilters()
    }
    const columns = [
        { title: 'Articulo', dataIndex: 'name' },
        { ...searchInTable('name') },
        { title: 'Código', dataIndex: 'code' },
        { ...searchInTable('code') },
        { title: 'Cantidad', dataIndex: 'amount' },
        { title: 'Precio Costo', dataIndex: 'costPrice' },
        { title: 'Precio Venta', dataIndex: 'sellPrice' },
        { title: 'Stock Negativo', dataIndex: 'negativeStock' },
        { title: 'Mínimo', dataIndex: 'minimum' },
        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div className="actions_table">
                    <i>
                        <DeleteOutlined
                            onClick={() => onClickEliminar(record.key)}
                            style={{ color: 'red' }}
                        />
                    </i>
                    <i>
                        <EditOutlined
                            onClick={(e) => editArticle(record)}
                            style={{ color: 'blue' }}
                        />
                    </i>
                </div>
            ),
        },
    ]

    //ARMAR LA TABLA
    const getRow = () => {

        return articles.map((article) => {
            return {
                key: article._id,
                name: article.name,
                code: article.code,
                amount: article.amount,
                costPrice: article.costPrice,
                sellPrice: article.sellPrice,
                negativeStock: article.negativeStock,
                minimum: article.minimum,
                articleTypeId:article.articleType._id,
                articleTypeName:article.articleType.name,
                description:article.description,
                brandId:article.brand._id,
                brandName:article.brand.name,
            }
        })
    }
    const onClickEliminar = (id) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: '!Si eliminas la localidad, sera dada de baja!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar',
        }).then((result) => {
            if (result.value) {
                deleteArticle(id)
                Swal.fire(
                    'Eliminado!',
                    'La localidad se eliminó correctamente.',
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

export default ArticuleList
