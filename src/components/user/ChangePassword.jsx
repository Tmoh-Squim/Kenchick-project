import { Button, Row, Form, Input, Typography } from "antd";
import Layout from "antd/es/layout/layout";
import axios from "axios";
import React, { useState } from "react";
import { Server_Url } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const { user } = useSelector((state) => state.user?.user);
  const [loading,setLoading] = useState(false);
  const handleChangePassword = async (values) => {
    try {
      setLoading(true)
      if (values.newPassword.length < 6) {
        setLoading(false)
        return toast.error("New password must be at least 6 char");
      }
      const response = await axios.post(
        `${Server_Url}/auth/change-password/${user._id}`,
        values
      );
      if (response.data.success) {
        toast.success(response.data.message);
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
        <h1 className="800px:text-2xl text-xl text-center">Change Your Password</h1>

        <Form
          layout="vertical"
          className="w-full rounded-md py-4 800px:px-2"
          style={{width:'100%'}}
          onFinish={(values) => handleChangePassword(values)}
        >
          <Form.Item name={"password"} label={"Enter your old password"} className="w-full">
            <Input
              placeholder="Enter your old password"
              name={"password"}
              type="password"
              className="h-[2.5rem] outline-none bg-slate-100 my-2"
              style={{ color: "gray" }}
            />
          </Form.Item>
          <Form.Item name={"newPassword"} label={"Enter new password"}>
            <Input
              placeholder="Enter new password"
              name={"newPassword"}
              type="password"
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
  );
};

export default ChangePassword;
