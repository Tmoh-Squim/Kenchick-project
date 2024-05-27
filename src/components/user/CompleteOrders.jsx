import { Table } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"

const CompletedOrders = () => {
  const {orders} = useSelector((state)=>state.adminOrders.orders);
  const [data,setData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{  
    const dat = orders.filter((order)=>order.status === 'Delivered');
    setData(dat)
  },[])
  

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
        title:"Name",
        key:"title",
        dataIndex:"title"
      },
      {
        title:"Description",
        key:"description",
        dataIndex:"description"
      },
      {
        title:"Created At",
        key:"createdAt",
        dataIndex:'createdAt'
      },
      {
        title:"Status",
        key:"status",
        dataIndex:'status'
      },
      {
        title:"Preview",
        key:"Preview",
        dataIndex:"_id",
        className:'cursor-pointer',
        render:(id,order)=>(
          
          <AiOutlineEye size={28}
          onClick={()=>{
            navigate(`/update-order/${id}`,{state:{order: order}})
          }}
           />
        )
      },

    ]}
    />

   </Content>
  )
}

export default CompletedOrders