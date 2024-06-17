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
  AiOutlineMessage,
  AiOutlineMoon,
  AiOutlineBell,
  AiOutlineOrderedList,
  AiOutlineProduct,
  AiOutlineSun,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineAlert,
} from "react-icons/ai";
import Dashboard from "./Dashboard";
import Products from "./Products";
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
import LimitedStock from "./LimitedStock";

const AdminDashboard = () => {
  const date = Date().slice(15, 18);

  const [collapsed, setCollapsed] = useState(false);
  const { products } = useSelector((state) => state.products);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 760px)" });
  const [active, setActive] = useState(1);
  const [limitedStock,setLimitedStock] = useState(0);
  const { user } = useSelector((state) => state.user?.user);
  const [outOfDelivery, setOutOfDelivery] = useState(0);
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
  useEffect(() => {
    const data = products?.filter((product) => product.stock === 0);
    const dat = products?.filter((product)=> product.stock !==0 && product.stock <10);
    setOutOfDelivery(data?.length);
    setLimitedStock(dat?.length);
  }, [products]);

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
      <Header
        className={`${
          theme ? "#0000004b" : "bg-white"
        } flex items-center justify-between px-4`}
      >
        <div className="flex items-center gap-5">
          <div
            className="800px:mx-4 mx-1 cursor-pointer mb-[1rem]"
            onClick={() => setCollapsed(!collapsed)}
          >
            <AiOutlineMenu
              size={25}
              color={theme === true ? "white" : "black"}
            />
          </div>

          <h1
            className={`${
              theme ? "text-white" : "text-black"
            } 800px:text-2xl text-xl align-middle text-center`}
          >
            {greeting} {user.name} Welcome to Your Dashboard
          </h1>
        </div>
        <div className="gap-5 flex items-center justify-end">
          <div className="relative cursor-pointer">
            <AiOutlineMessage size={30} />
            <div className="w-[20px] absolute h-[20px] bottom-0 left-0 rounded-full bg-green-500 text-white flex justify-center items-center">
              {5}
            </div>
          </div>
          <div className="relative cursor-pointer" onClick={()=>{setActive(15)}}>
            <AiOutlineAlert size={30} />
            <div className="w-[20px] absolute h-[20px] top-0 right-0 rounded-full bg-yellow-400 text-white flex justify-center items-center">
              {limitedStock}
            </div>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => {
              setActive(14);
            }}
          >
            <AiOutlineBell size={30} />
            <div className="w-[20px] absolute h-[20px] top-0 right-0 rounded-full bg-red-500 text-white flex justify-center items-center">
              {outOfDelivery}
            </div>
          </div>
        </div>
      </Header>
      <Layout theme="light" className="mt-0">
        <Sider
          collapsed={isSmallScreen ? true : collapsed}
          theme="light"
          className=" w-[5%] overflow-y-scroll"
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
                icon: theme ? (
                  <AiOutlineSun size={20} />
                ) : (
                  <AiOutlineMoon size={20} />
                ),
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
          {active === 14 && <OutOfStock />}
          {active === 15 && <LimitedStock />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
