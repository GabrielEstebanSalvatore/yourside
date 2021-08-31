import React, {useContext, useEffect }from 'react';
import AppContext from '../../context/app/appContext';
import ClientContext from '../../context/client/clientContext';
import {ButtonItemView } from '../../components/button'
import { Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

const ArticleList = () => {

    //TODO
    const appContext = useContext(AppContext);
    const {sacarArticuloCarrito } = appContext;

    const clientContext = useContext(ClientContext);
    const {trolley } = clientContext;

    useEffect(() => {
        // eslint-disable-next-line
    }, []);

    const deleteArticle =(id)=>{
        sacarArticuloCarrito(id)
    }
    const columns = [
        {title: 'Nombre',dataIndex: 'name'},
        {title: 'Tipo',dataIndex: 'articleType'},
        {title: 'Precio',dataIndex: 'sellPrice',},
        
        {   title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div className="actions_table">
                    <i>
                        <DeleteOutlined  onClick={() => onClickDelete(record.key)} style={{color: 'red'}}/>
                    </i> 
                </div>
            )
        }
    ];

    //ARMAR LA TABLA
   const getRow = () =>{
    return trolley.map((articulo)=>{
        return{
            key:articulo._id,
            name:articulo.name,
            articleType:articulo.articleType.name,
            sellPrice:articulo.sellPrice,
        }
    })
   }
   const onClickDelete =(id)=>{
    Swal.fire({
        title: '¿Estas seguro?',
        text: "!Si eliminas la localidad, sera dada de baja!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar'
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
    return(
        
        <div className="tabla">
            <Table 
            columns={columns}
            dataSource={getRow()} 
            />
        </div> 
    )
}

export default ArticleList;