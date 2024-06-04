import { Button, Modal, Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Server_Url } from '../../server';

const AdminUsers = () => {
  const { users } = useSelector((state) => state.users?.users);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setDeleteUser] = useState('');

  const getData = () => {
    const dat = [];
    users.map((product) => dat.push(product));
    return dat;
  };

  useEffect(() => {
    setData(getData());
    // eslint-disable-next-line
  }, [users]);

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`${Server_Url}/auth/delete-user/${id}`);

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setOpen(false);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

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
            title: "Email",
            key: "email",
            dataIndex: "email",
            responsive: ['md']
          },
          {
            title: "Name",
            key: "name",
            dataIndex: "name",
            responsive: ['md']
          },
          {
            title: "Role",
            key: "role",
            dataIndex: 'role',
            responsive: ['md']
          },
          {
            title: "Joined on",
            key: "createdAt",
            dataIndex: 'createdAt',
            responsive: ['md']
          },
          {
            title: "Action",
            key: "action",
            dataIndex: "_id",
            render: (id) => (
              <Button type='primary' danger
                onClick={() => {
                  setOpen(true);
                  setDeleteUser(id);
                }}>
                Delete
              </Button>
            ),
            responsive: ['md']
          },
        ]}
        scroll={{ x: 'max-content' }}
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => handleDeleteUser(id)}
        title="Do you want to delete the user?"
      />
    </Content>
  );
}

export default AdminUsers;
