import { Button, Modal, Table } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {toast} from "react-toastify"
import axios from "axios"
import { Server_Url } from '../../server'
const AdminUsers = () => {
  const {users} = useSelector((state)=>state.users?.users);
  const [data,setData] = useState([]);
  const [open,setOpen] = useState(false);
  const [id,setDeleteUser] = useState('');

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


  const handleDeleteUser = async(id) =>{
    try {
      const response = await axios.delete(`${Server_Url}/auth/delete-user/${id}`);

    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
   // dispatch(deleteProducti(id,dispatch));
    setOpen(false)
    } catch (error) {
      toast.error('Something went wrong!')
    }
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
              setDeleteUser(id)
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
    onOk={()=>handleDeleteUser(id)}
    title="Do you want to delete the user?"
     />

   </Content>
  )
}

export default AdminUsers