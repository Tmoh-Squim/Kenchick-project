import { Table } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"

const RefundedOrders = () => {
  const {orders} = useSelector((state)=>state.adminOrders.orders);
  const [data,setData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{  
    const dat = orders.filter((order)=>order.status === 'Refunded');
    setData(dat)
  },[])
  

  return (
   <Content>
    <Table
    scroll={{ x: true }}
    dataSource={data}
    columns={[
      {
        title:"Id",
        key:"_id",
        dataIndex:"_id",
        render: (text) => text.slice(0, 10)+ '...'
      },

      {
        title:"Item Qty",
        key:"title",
        render: (text, record) => record.cart.length,
      },
      {
        title:"Total",
        key:"total",
        dataIndex:"totalPrice"
      },
      {
        title:"Created At",
        key:"createdAt",
        dataIndex:'createdAt',
        render: (text) => text.slice(0, 10)
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

export default RefundedOrders