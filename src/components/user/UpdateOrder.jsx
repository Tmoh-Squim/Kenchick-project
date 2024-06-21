import {
  Button,
  Card,
  Col,
  Image,
  Layout,
  Modal,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Server, Server_Url } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";

const token = localStorage.getItem("token");

const OrderDetails = () => {
  const location = useLocation();
  const [loading,setLoading] = useState(false);
  const order = location.state.order;
  const [open,setOpen] = useState(false);
  const navigate = useNavigate();

  const handleRefund = async ()=>{
    try {
      setLoading(true);
      try {
        const status = "Refunded";
        const email = order?.user?.email;
        setLoading(true);
        const response = await axios.post(
          `${Server_Url}/order/refund-order/${order?._id}`,
          { email, status:status },
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
    } catch (error) {
      toast.error("Something went wrong! try again later")
    }finally{
      setLoading(false);
    }
  }
  
  return (
    <Layout className="p-2 h-[100vh]">
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

          <Card className="800px:w-[40%] 800px:mx-4">
            <h1 className="text-xl">Delivery details</h1>
            <div>
              <h1>County: {order?.deliveryDetails?.county}</h1>
              <h1>District: {order?.deliveryDetails?.district}</h1>
              <h1>Location: {order?.deliveryDetails?.location}</h1>
            </div>
          </Card>
          <Card className="800px:w-[50%]">
            <h1 className="text-xl">Payment info</h1>
            <div>
              <h1>Type: {order?.paymentInfo?.type}</h1>
              <h1>Status: {order?.paymentInfo?.status}</h1>
            </div>
          </Card>
        </div>
        {
          order?.status === "Delivered" && (
            <Card className="800px:w-[50%] my-1 shadow-md shadow-b w-full">
            <h1 className="text-xl">Refund order</h1>
            <div>
             <Button onClick={()=>setOpen(true)}>
              Refund
             </Button>
            </div>
          </Card>
          )
        }
      </Col>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => handleRefund()}
        title="Are you sure you want to refund the order?"
      />
    </Layout>
  );
};

export default OrderDetails;
