import {
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Layout,
  Menu,
  Typography,
} from "antd";
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
  const email = order?.user?.email;
  const token = localStorage.getItem('token')

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={(e) => setStatus("Confirmed")}>
        Confirmed
      </Menu.Item>
      <Menu.Item key="2" onClick={(e) => setStatus("Shipping")}>
        Shipping
      </Menu.Item>
      <Menu.Item key="3" onClick={(e) => setStatus("On the way")}>
        On the way
      </Menu.Item>
      <Menu.Item key="4s" onClick={(e) => setStatus("Delivered")}>
        Delivered
      </Menu.Item>
    </Menu>
  );

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.post(
        `${Server_Url}/order/update-order/${order?._id}`,
        { email: email, status: status },{
          headers:{
            'Authorization':token
          }
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout className="p-2">
      <h1 className="800px:text-3xl text-xl">
      Order details
      </h1>
     
      <Col>
        {order?.cart.map((item, index) => {
          return (
            <div key={index} className="my-2 800px:flex block">
              <div className="800px:flex block">
                <Image
                  src={`${Server}/${item.image}`}
                  alt={item.name}
                  className="800px:w-[100px] 800px:h-[100px] w-[100%] mx-auto cursor-pointer rounded-md"
                  width={200}
                  height={200}
                  onClick={() =>
                    navigate(`/product-details/${item._id}`, {
                      state: { product: item },
                    })
                  }
                />
                <Card className="block 800px:mx-4 800px:w-[57%] my-2 800px:my-0">
                  <Typography.Paragraph className="text-green-500">
                    Product details
                  </Typography.Paragraph>
                  <h1 className="font-semibold">{item.title}</h1>
                  <h1>{item.description}</h1>
                  <h1>Qty {item.qty}</h1>
                  <h1 className="text-semibold text-xl">
                    Ksh {order.totalPrice}
                  </h1>
                </Card>
              </div>
            </div>
          );
        })}
        <div className="800px:flex block">
          <Card className="800px:w-[50%] px-1">
            <h1 className="text-2xl">User details</h1>
            <div>
              <h1>Name: {order?.user?.name}</h1>
              <h1>Email: {order?.user?.email}</h1>
              <h1>Phone: {order?.user?.phone}</h1>
            </div>
          </Card>

          <Card className="800px:w-[40%] 800px:mx-4">
            <h1 className="text-2xl">Delivery details</h1>
            <div>
              <h1>County: {order?.deliveryDetails?.county}</h1>
              <h1>District: {order?.deliveryDetails?.district}</h1>
              <h1>Location: {order?.deliveryDetails?.location}</h1>
            </div>
          </Card>
        </div>

        <div className="800px:flex block my-2">
          <Card className="800px:w-[50%] px-1">
            <h1 className="text-2xl">Payment info</h1>
            <div>
              <h1>Type: {order?.paymentInfo?.type}</h1>
              <h1>Status: {order?.paymentInfo?.status}</h1>
            </div>
          </Card>

          <Card className="800px:w-[40%] 800px:mx-4 flex flex-col">
            <Col>
              <h1 className="text-2xl">Order status</h1>
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button className="flex justify-between items-center">
                  {status} <AiOutlineArrowDown size={14} />
                </Button>
              </Dropdown>
              <Button
                className="px-4 my-2"
                type="primary"
                danger
                onClick={handleUpdateStatus}
              >
                Update status
              </Button>
            </Col>
          </Card>
        </div>
      </Col>
    </Layout>
  );
};

export default AdminUpdateOrder;
