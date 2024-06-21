import { Card } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineDeliveredProcedure,
  AiOutlineProduct,
  AiOutlineShopping,
  AiOutlineTruck,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const Dashboard = () => {
  const [deliverd, setDelivered] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const [pending, setPending] = useState(0);
  const [returned, setReturned] = useState(0);
  const [shipping, setShipping] = useState(0);
  const { orders } = useSelector((state) => state.userOrders?.orders);

  useEffect(() => {
    const dat = orders?.filter((order) => order.status === "Delivered");
    setDelivered(dat?.length);
    const conf = orders?.filter((order) => order.status === "Confirmed");
    setConfirmed(conf?.length);
    const ped = orders?.filter((order) => order.status === "Pending");
    setPending(ped?.length);
    const ret = orders?.filter((order) => order.status === "Refunded");
    setReturned(ret?.length);
    const ship = orders?.filter((order) => order.status === "Shipping");
    setShipping(ship?.length);
  }, [orders]);

  return (
    <Content>
      <div className="px-2">
        <h1>Order Analytics</h1>

        <div className="800px:flex flex-wrap block ">
          <Card className="800px:w-[24%] shadow-sm mx-1 my-2 rounded-lg">
            <div className="flex justify-between">
              <h1>Pending</h1>
              <AiOutlineShopping size={30} />
            </div>
            {pending}
          </Card>
          <Card className="800px:w-[24%] shadow-sm mx-1 my-2 rounded-lg">
            <div className="flex justify-between">
              <h1>Confirmed</h1>
              <AiOutlineCheckCircle color="green" size={30} />
            </div>
            {confirmed}
          </Card>
          <Card className="800px:w-[24%] shadow-sm mx-1 my-2 rounded-lg">
            <div className="flex justify-between">
              <h1>Shipping</h1>
              <AiOutlineTruck size={30} />
            </div>
            {shipping}
          </Card>
          
          <Card className="800px:w-[24%] shadow-sm mx-1 my-2 rounded-lg">
            <div className="flex justify-between">
              <h1>All orders</h1>
              <AiOutlineProduct size={30}/>
              </div>
              {orders?.length}
            </Card>
            <Card className="800px:w-[24%] shadow-sm mx-1 my-2 rounded-lg">
              <div className="flex justify-between">
                <h1>Delivered</h1>
                <AiOutlineDeliveredProcedure size={30} />
              </div>
              {deliverd}
            </Card>
            <Card className="800px:w-[24%] shadow-sm mx-1 my-2 rounded-lg">
              <div className="flex justify-between">
                <h1>Returned</h1>
                <HiOutlineReceiptRefund size={30} />
              </div>
              {returned}
            </Card>
          </div>
        </div>
      </Content>
    );
  };

  export default Dashboard;
