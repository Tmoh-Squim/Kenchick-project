import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  AiOutlineDashboard,
  AiOutlineFileAdd,
  AiOutlineLock,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineMoon,
  AiOutlineOrderedList,
  AiOutlineProduct,
  AiOutlineSun,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import Dashboard from "./Dashboard";
import  Products from "./Products";
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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OutOfStock from "./OutOfStock";
import RefundedOrders from "./RefundedOrders";
import CreateCategory from "./Create-Category";
import Categories from "./Categories";

const AdminDashboard = () => {
  const date = Date().slice(15, 18);

  const [collapsed, setCollapsed] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 760px)" });
  const [active, setActive] = useState(1);
  const { user } = useSelector((state) => state.user?.user);
  const { theme } = useSelector((state) => state.theme);
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  dispatch(getUsers());
  dispatch(getOrdersAdmin());

  const handleTheme = () => {
    if (theme) {
      dispatch(removeTheme());
    } else {
      dispatch(setTheme());
    }
  };

  useEffect(() => {
    if (date < 12) {
      setGreeting("Good Morning");
    } else if (date >= 12 && date < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [date]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isSmallScreen) {
      setCollapsed(true);
    }
  }, [isSmallScreen]);

  return (
    <Layout className="overflow-x-hidden">
      <Header className={`${theme ? "#0000004b" : "bg-white"} flex items-center px-1`}>
        <div className="800px:mx-4 mx-1 cursor-pointer mb-[1rem]" onClick={() => setCollapsed(!collapsed)}>
          <AiOutlineMenu size={25} color={theme === true ? "white" : "black"} />
        </div>

        <h1 className={`${theme ? "text-white" : "text-black"} 800px:text-2xl text-xl align-middle text-center`}>
          {greeting} {user.name} Welcome to Your Dashboard
        </h1>
      </Header>
      <Layout theme="light" className="mt-1">
        <Sider
          collapsed={isSmallScreen ? true : collapsed}
          theme="light"
          className="bg-black h-screen w-[5%]"
          breakpoint="lg"
          collapsedWidth="50px"
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
                title: "Orders",
                label: "Orders",
                key: "Orders",
                children: [
                  {
                    title: "Pending orders",
                    label: "Pending orders",
                    key: "Pending orders",
                    onClick: () => {
                      setActive(7);
                    },
                  },
                  {
                    title: "Completed orders",
                    label: "Completed orders",
                    key: "Completed orders",
                    onClick: () => {
                      setActive(8);
                    },
                  },
                  {
                    title: "Refunded orders",
                    label: "Refunded orders",
                    key: "Refunded orders",
                    onClick: () => {
                      setActive(11);
                    },
                  },
                ],
                icon: <AiOutlineOrderedList size={20} />,
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
                  setActive(13);
                },
                icon: <AiOutlineProduct size={20} />,
              },
              {
                title: "Add Category",
                label: "Add Category",
                key: "Add Category",
                onClick: () => {
                  setActive(12);
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
                icon: theme ? <AiOutlineSun size={20} /> : <AiOutlineMoon size={20} />,
              },
              {
                title: "Logout",
                label: "Logout",
                key: "Logout",
                onClick: () => {
                  handleLogout();
                },
                icon: <AiOutlineLogout size={20} />,
              },
            ]}
          />
        </Sider>
        <Content className="p-2">
          {active === 1 && <Dashboard />}
          {active === 2 && <Products />}
          {active === 3 && <CreateProduct />}
          {active === 4 && <AdminUsers />}
          {active === 5 && <Profile />}
          {active === 6 && <ChangePassword />}
          {active === 7 && <PendingOrders />}
          {active === 8 && <CompletedOrders />}
          {active === 10 && <OutOfStock />}
          {active === 11 && <RefundedOrders />}
          {active === 12 && <CreateCategory />}
          {active === 13 && <Categories />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
