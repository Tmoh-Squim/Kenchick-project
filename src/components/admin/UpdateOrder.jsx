import { Button, Col, Dropdown, Image, Layout, Menu, Typography } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Server, Server_Url } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineArrowDown } from "react-icons/ai";

const AdminUpdateOrder = () => {
  const location = useLocation();
  const order = location.state.order;
  const navigate = useNavigate();
  const [status, setStatus] = useState(order?.status);
  const [loading,setLoading] = useState(false);
  const email = order?.user?.email;
  const token = localStorage.getItem("token");

  const menu =
    status === "Delivered" ? (
      <Menu>
        <Menu.Item key="4" onClick={() => setStatus("Delivered")}>
          Delivered
        </Menu.Item>
      </Menu>
    ) : (
      <Menu>
        <Menu.Item key="1" onClick={() => setStatus("Confirmed")}>
          Confirmed
        </Menu.Item>
        <Menu.Item key="2" onClick={() => setStatus("Shipping")}>
          Shipping
        </Menu.Item>
        <Menu.Item key="3" onClick={() => setStatus("On the way")}>
          On the way
        </Menu.Item>
        <Menu.Item key="4" onClick={() => setStatus("Delivered")}>
          Delivered
        </Menu.Item>
      </Menu>
    );

  const handleUpdateStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${Server_Url}/order/update-order/${order?._id}`,
        { email, status },
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
      toast.error("Something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return (
    <Layout className="800px:800px:p-4  p-2 bg-white shadow-md rounded-md">
      <Typography.Title level={3} className="text-center mb-4">
        Order Details
      </Typography.Title>

      <Col className="space-y-4">
        {order?.cart.map((item, index) => (
          <div key={index} className="block 800px:flex my-2 800px:800px:p-4  p-2 shadow-md">
            <Image
              src={`${Server}/${item.image}`}
              alt={item.name}
              className="w-full 800px:w-1/3 h-auto mx-auto md:mx-0 cursor-pointer rounded-md"
              width={200}
              height={200}
              onClick={() =>
                navigate(`/product-details/${item._id}`, {
                  state: { product: item },
                })
              }
            />
            <div className="mt-4 md:mt-0 md:ml-4 flex-1 800px:w-[50%]">
              <Typography.Paragraph className="text-green-500">
                Product details
              </Typography.Paragraph>
              <Typography.Title level={5}>{item.title}</Typography.Title>
              <Typography.Text>{item.description}</Typography.Text>
              <Typography.Text className="block mt-2">
                Qty: {item.qty}
              </Typography.Text>
              <Typography.Text className="font-semibold">
                Ksh {order.totalPrice}
              </Typography.Text>
            </div>
          </div>
        ))}

        <div className="800px:flex block 800px:p-4 p-2 shadow-md">
          <div className="flex-1">
            <Typography.Title level={5}>User Details</Typography.Title>
            <Typography.Text>Name: {order?.user?.name}</Typography.Text>
            <Typography.Text className="block">
              Email: {order?.user?.email}
            </Typography.Text>
            <Typography.Text>Phone: {order?.user?.phone}</Typography.Text>
          </div>

          <div className="flex-1 mt-4 md:mt-0 md:ml-4">
            <Typography.Title level={5}>Delivery Details</Typography.Title>
            <Typography.Text>
              County: {order?.deliveryDetails?.county}
            </Typography.Text>
            <Typography.Text className="block">
              District: {order?.deliveryDetails?.district}
            </Typography.Text>
            <Typography.Text>
              Location: {order?.deliveryDetails?.location}
            </Typography.Text>
          </div>
        </div>

        <div className="flex flex-col md:flex-row 800px:p-4 p-2 ">
          <div className="flex-1">
            <Typography.Title level={5}>Payment Info</Typography.Title>
            <Typography.Text>Type: {order?.paymentInfo?.type}</Typography.Text>
            <Typography.Text className="block">
              Status: {order?.paymentInfo?.status}
            </Typography.Text>
          </div>

          <div className="flex-1 mt-4 md:mt-0 md:ml-4 flex flex-col">
            <Typography.Title level={5}>Order Status</Typography.Title>
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button className="flex justify-between py-5 items-center w-full">
                {status} <AiOutlineArrowDown size={14} />
              </Button>
            </Dropdown>
            <Button
              className="mt-4 h-[2.5rem]"
              type="primary"
              danger
              loading={loading}
              onClick={handleUpdateStatus}
            >
              Update Status
            </Button>
          </div>
        </div>
      </Col>
    </Layout>
  );
};

export default AdminUpdateOrder;
