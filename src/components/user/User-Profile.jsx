import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineFileAdd,
  AiOutlineLock,
  AiOutlineMenu,
  AiOutlineMoon,
  AiOutlineOrderedList,
  AiOutlineProduct,
  AiOutlineSun,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import CreateProduct from "./CreateProduct";
import { removeTheme, setTheme } from "../../redux/theme";
import { getUsers } from "../../redux/user";
import AdminUsers from "./Users";
import { getOrdersAdmin } from "../../redux/order";
import CompletedOrders from "./CompleteOrders";
import PendingOrders from "./PendingOrders";
const UserProfile = () => {
  const date = Date().slice(15,18);

  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(1);
  const { user } = useSelector((state) => state.user?.user);
  const { theme } = useSelector((state) => state.theme);
  const [greeting,setGreeting] = useState('');
 
  const dispatch = useDispatch();
  dispatch(getUsers());
  dispatch(getOrdersAdmin());

  const handleTheme = () => {
    if(theme){
      dispatch(removeTheme());
    }else{
      dispatch(setTheme());
    }
  };
  useEffect(()=>{
    if(date < 12){
      setGreeting('Good Morning')
    }else if(date >= 12 && date < 19){
      setGreeting('Good Afternoon')
    }else{
      setGreeting('Good Evening')
    }
  },[date])
  return (
    <Layout className="overflow-x-hidden">
      <Header className={`${theme? '#0000004b':'bg-white'} flex items-center`}>
        <div
          className="mx-4 cursor-pointer mb-[1rem]"
          onClick={() => setCollapsed(!collapsed)}
        >
          <AiOutlineMenu size={25} color={theme ===true ?'white' :'black'} />
        </div>

        <h1 className={`${theme ? 'text-white' :'text-black'} text-2xl align-middle text-center`}>
          {greeting} {user.name} Welcome to Your Dashboard
        </h1>
      </Header>
      <Layout theme="light" className="mt-1">
        <Sider
          collapsed={collapsed}
          theme="light"
          className="bg-black h-screen"
        >
          <Menu
            mode="inline"
            items={[
              {
                title: "Dashboard",
                label: "Dashboard",
                key: "Dashboard",
                onClick: () => {
                  setActive(1);
                },
                icon: <AiOutlineDashboard size={20} />,
              },
              {
                title: "Products",
                label: "Products",
                key: "Products",
                onClick: () => {
                  setActive(2);
                },
                icon: <AiOutlineProduct size={20} />,
              },
              {
                title: "Orders",
                label: "Orders",
                key: "Orders",
                children: [
                  {
                    title: "Pending orders",
                    label: "Pending orders",
                    key: "Pending orders",
                    
                    onClick:()=>{setActive(7)}
                  },
                  {
                    title: "Completed orders",
                    label: "Completed orders",
                    key: "Completed orders",
                    onClick:()=>{setActive(8)}
                  },
                ],
               
                icon: <AiOutlineOrderedList size={20} />,
              },
              {
                title: "Add Product",
                label: "Add Product",
                key: "Add Product",
                onClick: () => {
                  setActive(3);
                },
                icon: <AiOutlineFileAdd size={20} />,
              },
              {
                title: "Categories",
                label: "Categories",
                key: "Categories",
                onClick: () => {
                  setActive();
                },
                icon: <AiOutlineProduct size={20} />,
              },
              {
                title: "Add Category",
                label: "Add Category",
                key: "Add Category",
                onClick: () => {
                  setActive();
                },
                icon: <AiOutlineFileAdd size={20} />,
              },
              {
                title: "Users",
                label: "Users",
                key: "Users",
                onClick: () => {
                  setActive(4);
                },
                icon: <AiOutlineUsergroupAdd size={20} />,
              },
              {
                title: "Profile",
                label: "Profile",
                key: "Profile",
                onClick: () => {
                  setActive(5);
                },
                icon: <AiOutlineUser size={20} />,
              },
              {
                title: "Change password",
                label: "Change password",
                key: "Change password",
                onClick: () => {
                  setActive(6);
                },
                icon: <AiOutlineLock size={20} />,
              },
              {
                title: "Switch theme",
                label: "Switch theme",
                key: "Switch theme",
                onClick: () => {
                  handleTheme();
                },
                icon: theme ? (
                  <AiOutlineSun size={20} />
                ) : (
                  <AiOutlineMoon size={20} />
                ),
              },
            ]}
          />
        </Sider>
        <Content className="p-2">
          {active === 1 && <Dashboard />}
          {active === 2 && <Orders />}
          {active === 3 && <CreateProduct />}
          {active === 4 && <AdminUsers />}
          {active === 5 && <Profile />}
          {active === 6 && <ChangePassword />}
          {active === 7 && <PendingOrders />}
          {active === 8 && <CompletedOrders />}
          
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserProfile;
