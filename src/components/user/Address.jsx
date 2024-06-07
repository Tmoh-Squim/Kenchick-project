import React, { useState } from "react";
import { Button, Form, Input, Layout } from "antd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Server_Url } from "../../server";
const Address = () => {
  const { user } = useSelector((state) => state.user?.user);
  const [county,setCounty] = useState('');
  const [subcounty,setSubcounty] = useState('');
  const [location,setLocation] = useState('');
  const [type,setType] = useState('');

  const token = localStorage.getItem('token');

  const handleUpdate = async (values) => {
    try {
      if (!values?.county || !values?.subcounty || !values?.location || !values?.type ) {
        return toast.error("All fields are required!");
      }
      const response = await axios.post(
        `${Server_Url}/auth/delivery-details/${user?._id}`,
        values,{
            headers:{
                'Authorization':token
            }
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setCounty('');
        setSubcounty('');
        setLocation('');
        setType('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <Layout className="p-2 flex justify-center w-full h-[90vh] items-center">
      <div className="my-2">
        <h1 className="text-2xl text-center font-semibold">
          Add Address
        </h1>
      </div>
      <Form
        layout="vertical"
        onFinish={(values) => {
          handleUpdate(values);
        }}
        className="800px:w-[50%] w-full"
      >
        <Form.Item label={"County"} name={"county"} initialValue={county}>
          <Input
            value={county}
            className="h-[2.5rem] "
          />
        </Form.Item>
        <Form.Item label={"Subcounty"} name={"subcounty"} initialValue={subcounty}>
          <Input value={subcounty} className="h-[2.5rem] " />
        </Form.Item>
        <Form.Item label={"Exact location"} name={"location"} initialValue={location}>
          <Input value={location} className="h-[2.5rem] " />
        </Form.Item>
        <Form.Item label={"Address type"} name={"type"} initialValue={type}>
          <Input value={type} className="h-[2.5rem] " />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          className="px-10  flex justify-center items-center"
        >
          <h1 className="text-[16px] text-center mt-2">Submit</h1>
        </Button>
      </Form>
    </Layout>
  );
};

export default Address;
