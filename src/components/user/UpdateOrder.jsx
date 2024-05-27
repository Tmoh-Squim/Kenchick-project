import { Button, Card, Col, Dropdown, Image, Layout, Menu, Typography } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Server } from "../../server";

const UpdateOrder = () => {
  const location = useLocation();
  const order = location.state.order;
  const navigate = useNavigate();
  const [status, setStatus] = useState(order?.status);

  const menu = (
    <Menu>
      <Menu.Item key='1' onClick={(e)=>setStatus('Processing')}>
        Processing
      </Menu.Item>
      <Menu.Item key='2' onClick={(e)=>setStatus('Pending')}>
        Pending
      </Menu.Item>
      <Menu.Item key='3' onClick={(e)=>setStatus('Delivered')}>
        Delivered
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout className="p-2">
      <Typography.Title>Order details</Typography.Title>
      <Col>
        {order?.cart.map((item, index) => {
          return (
            <div key={index} className="my-2 800px:flex block">
              <div className="800px:flex block">
                <Image
                  src={`${Server}/${item.image}`}
                  alt={item.name}
                  className="w-[100px] h-[100px] cursor-pointer rounded-md"
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

          <Card className="800px:w-[40%] 800px:mx-4">
            <h1 className="text-2xl">Order status</h1>
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button>
                {status}
              </Button>
            </Dropdown>
          </Card>
        </div>
      </Col>
    </Layout>
  );
};

export default UpdateOrder;
