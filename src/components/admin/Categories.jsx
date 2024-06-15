import { Button, Modal, Table } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Loader from '../../utils/Loader';
import { deleteCategori, getCategories } from '../../redux/category';

const Categories = () => {
  const { categories } = useSelector((state) => state.categories);
  const {loading,success} = useSelector((state)=>state.deleteCategory);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = () => {
    const dat = [];
    categories.map((product) => dat.push(product));
    return dat;
  };

  useEffect(() => {
    setData(getData());
  }, [categories]);

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategori(id))
    setOpen(false);
  };
  useEffect(()=>{
    if(success === true){
      dispatch(getCategories())
    }
  },[success])

  const columns = [
    {
      title: "Id",
      key: "_id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "Action",
      dataIndex: "_id",
      render: (id) => (
        <ButtonGroup className="responsive-button-group">
          <Button type='primary mx-2'
      
          >
            Edit
          </Button>
          <Button type='primary' danger
            onClick={() => {
              setOpen(true);
              setId(id);
            }}>
            Delete
          </Button>
        </ButtonGroup>
      )
    }
  ];

  return (
    <>
    {
      loading ? (
        <div className="w-full h-screen bg-white flex justify-center items-center">
        <Loader />
      </div>
      ):(
        <Content>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: true }}
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => handleDeleteCategory(id)}
        title="Do you want to delete this category?"
      />
    </Content>
      )
    }
    </>
  );
}

export default Categories;
