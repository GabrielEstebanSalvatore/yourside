import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/app/appContext'
import { Input, Button, Space, Table } from 'antd'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'

const ListReceiptAdmin = () => {
    const appContext = useContext(AppContext)
    const { traerComprobantesAdmin, comprobantes } = appContext

    // const [localState, setLocalState] = useState({
    //     modalView: 'ReciboAdmin',
    //     showModal: true,
    // })

    // const setShowModalReciboAdmin = (reciboAdmin) => {

    //     handleModal(localState.modalView, localState.showModal)
    // }

    useEffect(() => {
        traerComprobantesAdmin()

        // eslint-disable-next-line
    }, [])
    // const [pagination] = useState({
    //     bottom: 'bottomCenter',
    // })

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

    const columns = [
        { title: 'Numero de C.', dataIndex: 'name' },
        { ...buscarDatoTabla('name') },
        { title: 'Cliente', dataIndex: 'client' },
        { title: 'Correo', dataIndex: 'email' },
        { title: 'Fecha', dataIndex: 'date' },
        { ...buscarDatoTabla('date') },
        { title: 'Total', dataIndex: 'price' },

        // {
        //     title: 'Acciones',
        //     key: 'actions',
        //     render: (text, record) => (
        //         <div className="actions_table">
        //             {/* <i>
        //                 <DeleteOutlined
        //                     onClick={() => onClickEliminar(record.key)}
        //                     style={{ color: 'red' }}
        //                 />
        //             </i> */}
        //             {/* <i>
        //                 <EditOutlined onClick={(e) => setShowModalReciboAdmin(record)} style={{color: 'blue'}}/>
        //             </i> */}
        //         </div>
        //     ),
        // },
    ]

    //ARMAR LA TABLA
    const getRow = () => {
        return comprobantes.map((comprobante) => {
            return {
                key: comprobante._id,
                name: comprobante.number,
                client: comprobante.client.name,
                email: comprobante.client.email,
                date: comprobante.date,
                price: comprobante.price,
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
        <div className="tabla">
            <Table columns={columns} dataSource={getRow()} />
        </div>
    )
}

export default ListReceiptAdmin
