import { Button, Modal, Table } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProducti } from '../../redux/product'

const AdminUsers = () => {
  const {users} = useSelector((state)=>state.users?.users);
  const [data,setData] = useState([]);
  const [open,setOpen] = useState(false);
  const [deleteProduct,setDeleteProduct] = useState('');
  const dispatch = useDispatch();

  const getData = ()=>{
    const dat = [];
    users.map((product)=>(
      dat.push(product)
    ))
    return dat
  }
  getData();
  useEffect(()=>{
    setData(getData())
    //eslint-disable-next-line
  },[])


  const handleDeleteProduct = (deleteProduct) =>{
    dispatch(deleteProducti(deleteProduct,dispatch));
    setOpen(false)
  }
  return (
   <Content>
    <Table
    dataSource={data}
    columns={[
      {
        title:"Id",
        key:"_id",
        dataIndex:"_id"
      },

      {
        title:"Email",
        key:"email",
        dataIndex:"email"
      },
      {
        title:"Name",
        key:"name",
        dataIndex:"name"
      },
      {
        title:"Role",
        key:"Role",
        dataIndex:'role'
      },
      {
        title:"Joined on",
        key:"CreatedAt",
        dataIndex:`createdAt`
      },
      {
        title:"Action",
        key:"Action",
        dataIndex:"_id",
      
        render:(id)=>(
            <Button type='primary' danger 
            onClick={()=>{
              setOpen(true);
              setDeleteProduct(id)
            }}>
              Delete
            </Button>
        )
      }

    ]}
    />
    <Modal
    open={open}
    onCancel={()=>setOpen(false)}
    onOk={()=>handleDeleteProduct(deleteProduct)}
    title="Do you want to delete the user?"
     />

   </Content>
  )
}

export default AdminUsers