import { Button, Form, Input, Layout, Row } from 'antd'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Server_Url } from '../../server';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../redux/category';

const CreateCategory = () => {
    const [loading,setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
  const handleCreateCategory = async (values) => {
    try {
      setLoading(true)
      if (values.category.length === '') {
        setLoading(false)
        return toast.error("Category name is required");
      }
      const response = await axios.post(
        `${Server_Url}/category/create-category`,
        values,{
            headers:{
                "Authorization":token
            }
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(getCategories());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }finally{
      setLoading(false)
    }
  };
  return (
    <Layout className="800px:px-4 w-full flex justify-center h-screen items-center">
    <Row className="my-auto">
      <h1 className="text-2xl text-center">Create  category</h1>

      <Form
        layout="vertical"
        className="w-full rounded-md py-4 800px:px-2"
        style={{width:'100%'}}
        onFinish={(values) => handleCreateCategory(values)}
      >
        <Form.Item name={"category"} label={"Enter category name"}>
          <Input
            placeholder="Enter category name"
            name={"category"}
            type="text"
            className="h-[2.5rem] outline-none bg-slate-100 my-2"
            style={{ color: "gray" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full h-[2.5rem]" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  </Layout>
  )
}

export default CreateCategory