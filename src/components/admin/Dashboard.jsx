import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  AiOutlineCheckCircle,
  AiOutlineDeliveredProcedure,
  AiOutlineProduct,
  AiOutlineShopping,
  AiOutlineTruck,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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
    const pieDataFiltered = [
      { name: "Pending", value: pending },
      { name: "Confirmed", value: confirmed },
      { name: "Shipping", value: shipping },
      { name: "Returned", value: returned },
    ].filter(item => item.value > 0);

    setPieData(pieDataFiltered);

    const barDataFiltered = [
      { name: "Delivered", value: deliverd },
      { name: "Confirmed", value: confirmed },
      { name: "Pending", value: pending },
      { name: "Shipping", value: shipping },
      { name: "Returned", value: returned },
    ].filter(item => item.value > 0);

    setBarData(barDataFiltered);
  }, [pending, confirmed, shipping, returned, deliverd]);

  const COLORS = ["#5B8FF9", "#5AD8A6", "#5D7092", "#F6BD16", "#E8684A"];

  const handleOutOfDelivery = () => {};

  return (
    <Content>
      <div className="800px:px-2">
        <h1>Business Analytics</h1>

        <div className="800px:flex flex-wrap justify-between block ">
          <Card className="800px:w-[23%] w-full shadow-sm 800px:m-2 my-1 rounded-lg">
            <div className="flex justify-between">
              <h1>Pending</h1>
              <AiOutlineShopping size={30} />
            </div>
            {pending}
          </Card>
          <Card className="800px:w-[23%] w-full shadow-sm 800px:m-2 my-1 rounded-lg">
            <div className="flex justify-between">
              <h1>Confirmed</h1>
              <AiOutlineCheckCircle color="green" size={30} />
            </div>
            {confirmed}
          </Card>
          <Card className="800px:w-[23%] w-full shadow-sm 800px:m-2 my-1 rounded-lg">
            <div className="flex justify-between">
              <h1>Shipping</h1>
              <AiOutlineTruck size={30} />
            </div>
            {shipping}
          </Card>
          <Card
            className="800px:w-[23%] w-full shadow-sm 800px:m-2 my-1 rounded-lg cursor-pointer"
            onClick={handleOutOfDelivery}
          >
            <div className="flex justify-between">
              <h1>Out of stock</h1>
              <AiOutlineProduct size={30} color="red" />
            </div>
            {outOfDelivery}
          </Card>
          <Card className="800px:w-[23%] w-full shadow-sm 800px:m-2 my-1 rounded-lg">
            <div className="flex justify-between">
              <h1>All products</h1>
              <AiOutlineProduct size={30} />
            </div>
            <CountUp end={products?.length} duration={2} />
          </Card>
          <Card className="800px:w-[23%] w-full shadow-sm 800px:m-2 my-1 rounded-lg">
            <div className="flex justify-between">
              <h1>Delivered</h1>
              <AiOutlineDeliveredProcedure size={30} />
            </div>
            {deliverd}
          </Card>
          <Card className="800px:w-[23%] w-full shadow-sm 800px:m-2 my-1 rounded-lg">
            <div className="flex justify-between">
              <h1>All users</h1>
              <AiOutlineUsergroupAdd size={30} />
            </div>
            {users?.length}
          </Card>
          <Card className="800px:w-[23%] w-full shadow-sm 800px:m-2 my-1 rounded-lg">
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
        <Row gutter={16}>
          <Col span={16}>
            <BarChart
              width={600}
              height={300}
              data={barData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </Col>
          <Col span={8}>
            <PieChart width={450} height={450}>
              <Pie
                data={pieData}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Col>
        </Row>
      </Card>
    </Content>
  );
};

export default Dashboard;
