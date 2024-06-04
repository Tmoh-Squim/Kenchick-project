import { Button, Row, Form, Input, Typography } from "antd";
import Layout from "antd/es/layout/layout";
import axios from "axios";
import React from "react";
import { Server_Url } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const {user} = useSelector((state)=>state.user?.user);
  const handleChangePassword = async(values)=>{
    try {
      if(values.newPassword.length < 6){
        return toast.error('New password must be at least 6 char')
      }
      const response = await axios.post(`${Server_Url}/auth/change-password/${user._id}`,values);
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  return (
    <Layout className="800px:px-4 flex justify-center h-screen items-center">
     <Row className="my-auto">
     <h1 className="text-2xl text-center">
     Change Your Password
     </h1>
     
      <Form layout="vertical" className="800px:w-full rounded-md bg-slate-100 py-4 px-1 800px:px-2" onFinish={(values) => handleChangePassword(values)}>
        <Form.Item name={"password"} label={'Enter your old password'}>
          <Input
            placeholder="Enter your old password"
            name={"password"}
            type="password"
            className="h-[2.5rem] outline-none bg-slate-100 my-2"
            style={{ color: "gray" }}
          />
        </Form.Item>
        <Form.Item name={'newPassword'} label={'Enter new password'}>
          <Input
            placeholder="Enter new password"
            name={"newPassword"}
            type="password"
            className="h-[2.5rem] outline-none bg-slate-100 my-2"
            style={{ color: "gray" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
     </Row>
    </Layout>
  );
};

export default ChangePassword;
