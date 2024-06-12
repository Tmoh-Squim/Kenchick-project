import { Button, Modal, Table } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { deleteProducti, getProducts } from '../../redux/product';
import Loader from '../../utils/Loader';

const Orders = () => {
  const { products } = useSelector((state) => state.products);
  const {loading,success} = useSelector((state)=>state.deleteProduct);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = () => {
    const dat = [];
    products.map((product) => dat.push(product));
    return dat;
  };

  useEffect(() => {
    setData(getData());
  }, [products]);

  const handleDeleteProduct = (deleteProduct) => {
    dispatch(deleteProducti(deleteProduct, dispatch));
    setOpen(false);
  };
  useEffect(()=>{
    if(success === true){
      dispatch(getProducts())
    }
  },[success])

  const columns = [
    {
      title: "Id",
      key: "_id",
      dataIndex: "_id",
      responsive: ['md'],
    },
    {
      title: "Name",
      key: "title",
      dataIndex: "title",
      render: (text) => text.slice(0, 20)+ '...'
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      responsive: ['lg'],
    },
    {
      title: "Sold Out",
      key: "sold",
      dataIndex: 'sold',
      responsive: ['md'],
    },
    {
      title: "Stock",
      key: "stock",
      dataIndex: 'stock',
      responsive: ['md'],
    },
    {
      title: "Preview",
      key: "Preview",
      className: 'cursor-pointer',
      render: (id, product) => (
        <AiOutlineEye
          size={28}
          onClick={() => {
            navigate(`/product-details/${id}`, { state: { product: product } });
          }}
        />
      )
    },
    {
      title: "Action",
      key: "Action",
      dataIndex: "_id",
      render: (id, product) => (
        <ButtonGroup className="responsive-button-group">
          <Button type='primary mx-2'
            onClick={() => {
              navigate(`/update-product/${id}`, { state: { product: product } });
            }}
          >
            Edit
          </Button>
          <Button type='primary' danger
            onClick={() => {
              setOpen(true);
              setDeleteProduct(id);
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
        onOk={() => handleDeleteProduct(deleteProduct)}
        title="Do you want to delete the product?"
      />
    </Content>
      )
    }
    </>
  );
}

export default Orders;
