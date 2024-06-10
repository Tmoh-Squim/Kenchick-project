import {Table } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"

const PendingOrders = () => {
  const {orders} = useSelector((state)=>state.userOrders?.orders);
  const navigate = useNavigate();

  return (
   <Content>
    <Table
    dataSource={orders}
    scroll={{ x: true }}
    columns={[
      {
        title:"Id",
        key:"_id",
        dataIndex:"_id"
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
            navigate(`/order/${id}`,{state:{order: order}})
          }}
           />
        )
      },

    ]}
    />

   </Content>
  )
}

export default PendingOrders