import { Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PendingOrders = () => {
  const { orders } = useSelector((state) => state.adminOrders.orders);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dat = orders.filter((order) => order.status !== 'Delivered');
    setData(dat);
  }, [orders]);

  return (
    <Content>
      <Table
        dataSource={data}
        columns={[
          {
            title: "Id",
            key: "_id",
            dataIndex: "_id",
            responsive: ['md']
          },
          {
            title: "Item Qty",
            key: "title",
            render: (text, record) => record.cart.length,
            responsive: ['md']
          },
          {
            title: "Total",
            key: "total",
            dataIndex: "totalPrice",
            responsive: ['md']
          },
          {
            title: "Created At",
            key: "createdAt",
            dataIndex: 'createdAt',
            responsive: ['md']
          },
          {
            title: "Status",
            key: "status",
            dataIndex: 'status',
            responsive: ['md']
          },
          {
            title: "Preview",
            key: "Preview",
            dataIndex: "_id",
            className: 'cursor-pointer',
            render: (id, order) => (
              <AiOutlineEye size={28}
                onClick={() => {
                  navigate(`/update-order/${id}`, { state: { order: order } });
                }}
              />
            ),
            responsive: ['md']
          },
        ]}
        scroll={{ x: 'max-content' }}
      />
    </Content>
  );
}

export default PendingOrders;
