import { Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.userOrders.orders);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dat = orders.filter((order) => order?.status !== 'Delivered');
    setData(dat);
  }, [orders]);

  return (
    <Content>
      <Table
        dataSource={data}
        columns={[
          {
            title: "Order Id",
            key: "_id",
            dataIndex: "_id",
            responsive: ['md']
          },
          {
            title: "Status",
            key: "status",
            dataIndex: 'status',
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
            key: "description",
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
            title: "Preview",
            key: "Preview",
            dataIndex: "_id",
            className: 'cursor-pointer',
            render: (id, order) => (
              <MdOutlineTrackChanges size={28}
                onClick={() => {
                  navigate(`/track-order/${id}`, { state: { order: order } });
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

export default TrackOrder;
