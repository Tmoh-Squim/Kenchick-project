import React, { useState } from "react";
import { Button, Form, Image, Input, Layout } from "antd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Server, Server_Url } from "../../server";
const token = localStorage.getItem("token");
const Profile = () => {
  const { user } = useSelector((state) => state.user?.user);
  const [name] = useState(user?.name);
  const [idNumber] = useState(user?.idNumber);
  const [email] = useState(user?.email);
  const [phone] = useState(user?.phone);
  const [loading, setLoading] = useState(false);
  const [avatar] = useState(user?.avatar);

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      if (!values?.password) {
        setLoading(false);
        return toast.error("Passowrd is required!");
      }
      const response = await axios.post(
        `${Server_Url}/auth/update-user-details/${user?._id}`,
        values,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout className="p-2 flex justify-center w-full  items-center">
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
        <div className="w-full flex justify-center items-center">
          <Image
            src={
              avatar
                ? `${Server}/${avatar}`
                : "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-1024.png"
            }
            width={130}
            height={130}
            className="cursor-pointer rounded-full"
            alt="avatar"
          />
        </div>
        <Form.Item label={"Full name"} name={"name"} initialValue={name}>
          <Input
            value={name}
            className="h-[2.5rem] text-xl text-white "
            disabled
          />
        </Form.Item>
        <Form.Item
          label={"Id number"}
          name={"idNumber"}
          initialValue={idNumber}
        >
          <Input
            value={idNumber}
            className="h-[2.5rem] text-xl text-white "
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
          <Input
            value={name}
            className="h-[2.5rem] "
            placeholder="Enter your password"
          />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          className="px-10  flex w-full py-5 justify-center items-center"
        >
          <h1 className="text-[16px] text-center mt-2">Update</h1>
        </Button>
      </Form>
    </Layout>
  );
};

export default Profile;
