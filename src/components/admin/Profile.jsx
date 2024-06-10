import React, { useState } from "react";
import { Button, Form, Input, Layout } from "antd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Server_Url } from "../../server";
const Profile = () => {
  const { user } = useSelector((state) => state.user?.user);
  const [name] = useState(user?.name);
  const [email] = useState(user?.email);
  const [phone] = useState(user?.phone);

  const handleUpdate = async (values) => {
    try {
      if (!values?.password) {
        return toast.error("Passowrd is required!");
      }
      const response = await axios.post(
        `${Server_Url}/auth/update-user-details/${user?._id}`,
        values
      );
      if (response.data.success) {
        toast.success(response.data.message);
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
          Update your profile
        </h1>
      </div>
      <Form
        layout="vertical"
        onFinish={(values) => {
          handleUpdate(values);
        }}
        className="800px:w-[50%] w-full"
      >
        <Form.Item label={"Full name"} name={"name"} initialValue={name}>
          <Input
            value={name}
            className="h-[2.5rem] text-xl "
            disabled
          />
        </Form.Item>
        <Form.Item label={"Email"} name={"email"} initialValue={email}>
          <Input value={email} className="h-[2.5rem] " />
        </Form.Item>
        <Form.Item label={"Phone Number"} name={"phone"} initialValue={phone}>
          <Input value={phone} className="h-[2.5rem] " />
        </Form.Item>
        <Form.Item label={"Enter Your Password"} name={"password"}>
          <Input value={name} className="h-[2.5rem] " placeholder="Enter your password" />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          className="px-10  flex justify-center items-center"
        >
          <h1 className="text-[16px] text-center mt-2">Update</h1>
        </Button>
      </Form>
    </Layout>
  );
};

export default Profile;
