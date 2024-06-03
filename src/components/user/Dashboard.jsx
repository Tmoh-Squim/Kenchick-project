import { Card, Col, Row, Space, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
//import { Bar, Pie } from "@ant-design/charts";
import React, { useEffect, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineDeliveredProcedure,
  AiOutlineProduct,
  AiOutlineShopping,
  AiOutlineTruck,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [deliverd, setDelivered] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const [pending, setPending] = useState(0);
  const [returned, setReturned] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [outOfDelivery, setOutOfDelivery] = useState(0);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const { orders } = useSelector((state) => state.adminOrders?.orders);
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.users?.users);

  const navigate = useNavigate();

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

  useEffect(() => {
    const data = products?.filter((product) => product.stock === 0);
    setOutOfDelivery(data?.length);
  }, [products]);

  useEffect(() => {
    setPieData([
      { type: "Pending", value: pending },
      { type: "Confirmed", value: confirmed },
      { type: "Shipping", value: shipping },
      { type: "Returned", value: returned },
    ]);

    // Prepare data for the bar chart
    const statusCounts = [
      { status: "Delivered", count: deliverd },
      { status: "Confirmed", count: confirmed },
      { status: "Pending", count: pending },
      { status: "Shipping", count: shipping },
      { status: "Returned", count: returned },
    ];

    setBarData(statusCounts);
  }, [pending, confirmed, shipping, returned, deliverd]);

  const pieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    interactions: [{ type: "element-active" }],
    color: ["#5B8FF9", "#5AD8A6", "#5D7092", "#F6BD16", "#E8684A"],
    label: {
      style: {
        fill: "#000",
        fontSize: 14,
      },
    },
    legend: {
      position: "bottom",
      layout: "vertical",
    },
  };

  const barConfig = {
    data: barData,
    xField: 'status',
    yField: 'count',
    seriesField: 'status',
    barWidthRatio: 5.0,
    color: ["#5B8FF9", "#5AD8A6", "#5D7092", "#F6BD16", "#E8684A"],
    xAxis: {
      label: {
        formatter: (v) => `${v}`,
      },
    },
    yAxis: {
      label: {
        formatter: (v) => `${v}`,
      },
    },
    legend: {
      position: 'top',
    },
    animation: {
      appear: {
        animation: 'scale-in-y',
        duration: 5000,
      },
    },
  };


  const handleOutOfDelivery = () => {};

  return (
    <Content>
      <div className="px-2">
        <h1>Business Analytics</h1>

        <div className="800px:flex flex-wrap block ">
          <Card className="800px:w-[23%] shadow-sm m-2  rounded-lg">
            <div className="flex justify-between">
              <h1>Pending</h1>
              <AiOutlineShopping size={30} />
            </div>
            {pending}
          </Card>
          <Card className="800px:w-[23%] shadow-sm m-2  rounded-lg">
            <div className="flex justify-between">
              <h1>Confirmed</h1>
              <AiOutlineCheckCircle color="green" size={30} />
            </div>
            {confirmed}
          </Card>
          <Card className="800px:w-[23%] shadow-sm m-2  rounded-lg">
            <div className="flex justify-between">
              <h1>Shipping</h1>
              <AiOutlineTruck size={30} />
            </div>
            {shipping}
          </Card>
          <Card
            className="800px:w-[23%] shadow-sm m-2  rounded-lg cursor-pointer"
            onClick={handleOutOfDelivery}
          >
            <div className="flex justify-between">
              <h1>Out of stock</h1>
              <AiOutlineProduct size={30} color="red" />
            </div>
            {outOfDelivery}
          </Card>
          <Card className="800px:w-[23%] shadow-sm m-2  rounded-lg">
            <div className="flex justify-between">
              <h1>All products</h1>
              <AiOutlineProduct size={30}/>
              </div>
              {products?.length}
            </Card>
            <Card className="800px:w-[23%] shadow-sm m-2  rounded-lg">
              <div className="flex justify-between">
                <h1>Delivered</h1>
                <AiOutlineDeliveredProcedure size={30} />
              </div>
              {deliverd}
            </Card>
            <Card className="800px:w-[23%] shadow-sm m-2  rounded-lg">
              <div className="flex justify-between">
                <h1>All users</h1>
                <AiOutlineUsergroupAdd size={30} />
              </div>
              {users?.length}
            </Card>
            <Card className="800px:w-[23%] shadow-sm m-2  rounded-lg">
              <div className="flex justify-between">
                <h1>Returned</h1>
                <HiOutlineReceiptRefund size={30} />
              </div>
              {returned}
            </Card>
          </div>
        </div>
        <Card>
          <h1>Order statistics</h1>
          <Card>
            <h1>Order statistics</h1>
            <Row gutter={16}>
              {/*
              <Col span={16}>
                <Bar {...barConfig} height={250} layout={'vertical'}/>
              </Col>
              <Col span={8}>
                <Pie {...pieConfig} height={250} />
              </Col> 
  */}
            </Row>
          </Card>
        </Card>
      </Content>
    );
  };

  export default Dashboard;
