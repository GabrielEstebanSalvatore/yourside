import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/app/appContext'
import ClientContext from '../../context/client/clientContext'
import { Input, Button, Space, Table } from 'antd'
import {
    DeleteOutlined,
    SearchOutlined,
    ProfileOutlined,
} from '@ant-design/icons'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { formatter, formatDate } from './../../utils/utils'
const ListReceipt = () => {
    let history = useHistory()
    const appContext = useContext(AppContext)
    const { traerComprobantes, comprobantes } = appContext

    const clientContext = useContext(ClientContext)
    const { client } = clientContext

    useEffect(() => {
        traerComprobantes(client)

        // eslint-disable-next-line
    }, [])

    const [buscar] = useState({
        searchText: '',
        searchedColumn: '',
    })

    const buscarDatoTabla = (dataIndex) => ({
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
        //this.setState({ ...turno,searchText: '' });
    }

    const showRecipt = (reciptId) => {
        history.push('/comprobantes/' + reciptId._id)
    }

    const columns = [
        { title: 'Numero de C.', dataIndex: 'name' },
        { ...buscarDatoTabla('name') },
        { title: 'Cliente', dataIndex: 'client' },
        { title: 'Correo', dataIndex: 'email' },
        { title: 'Fecha', dataIndex: 'date' },
        { ...buscarDatoTabla('date') },
        { title: 'Total', dataIndex: 'price' },

        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div className="actions_table">
                    <i>
                        <ProfileOutlined
                            onClick={() => showRecipt(record.key)}
                            style={{ color: 'blue' }}
                            title="Ver comprobante"
                        />
                    </i>
                </div>
            ),
        },
    ]

    const getRow = () => {
        return comprobantes.map((comprobante) => {
            return {
                key: comprobante.receiptDetail,
                name: comprobante.number,
                client: comprobante.client.name,
                email: comprobante.client.email,
                date: formatDate(comprobante.date),
                price: formatter.format(comprobante.price),
            }
        })
    }

    const onClickEliminar = (id) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: '!Si eliminas el recibo, sera dada de baja!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar',
        }).then((result) => {
            if (result.value) {
                //eliminarRecibo(id)
                Swal.fire(
                    'Eliminado!',
                    'La localidad se eliminó correctamente.',
                    'success'
                )
            }
        })
    }

    return (
        <div className="tabla" style={{ marginTop: 50 }}>
            <Table columns={columns} dataSource={getRow()} />
        </div>
    )
}

export default ListReceipt
