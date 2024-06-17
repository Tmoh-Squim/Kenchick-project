import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  AiOutlineDashboard,
  AiOutlineLock,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineMoon,
  AiOutlineOrderedList,
  AiOutlineSave,
  AiOutlineSun,
  AiOutlineUser,
} from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { removeTheme, setTheme } from "../../redux/theme";
import AdminUsers from "./Users";
import { getOrdersUser } from "../../redux/order";
import CompletedOrders from "./Orders";
import Orders from "./Orders";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TrackOrder from "./TrackOrder";
import OutOfStock from "./OutOfStock";
import Address from "./Address";
import SavedAddress from "./SavedAddress";
import UserPendingOrders from "./PendingOrders";

const UserProfile = () => {
  const date = Date().slice(15, 18);
  const [collapsed, setCollapsed] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 760px)" });
  const [active, setActive] = useState(1);
  const { user } = useSelector((state) => state.user?.user);
  const { theme } = useSelector((state) => state.theme);
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersUser(user?._id));
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (date < 12) {
      setGreeting("Good Morning");
    } else if (date >= 12 && date < 19) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [date]);

  useEffect(() => {
    if (isSmallScreen) {
      setCollapsed(true);
    }
  }, [isSmallScreen]);

  const handleTheme = () => {
    if (theme) {
      dispatch(removeTheme());
    } else {
      dispatch(setTheme());
    }
  };

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

  return (
    <Layout className="overflow-x-hidden">
      <Header className={`${theme ? '#0000004b' : 'bg-white'} flex shadow-lg items-center px-1`}>
        <div
          className="800px:mx-4 mx-1 cursor-pointer mb-[1rem]"
          onClick={() => setCollapsed(!collapsed)}
        >
          <AiOutlineMenu size={25} color={theme ? 'white' : 'black'} />
        </div>

        <h1 className={`${theme ? 'text-white' : 'text-black'} 800px:text-2xl text-xl align-middle text-center`}>
          {greeting} {user.name} Welcome to Your Dashboard
        </h1>
      </Header>
      <Layout theme="light" className="mt-0">
        <Sider
          collapsed={isSmallScreen ? true : collapsed}
          theme="light"
          collapsedWidth="50px"
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
                title: "Orders",
                label: "Orders",
                key: "Orders",
                children:[
                  {
                    title: "Pending Orders",
                    label: "Pending Orders",
                    key: "Pending Orders",
                    onClick: () => {
                      setActive(11);
                    },
                    
                  },
                  {
                    title: "Delivered Orders",
                    label: "Delivered Orders",
                    key: "Delivered Orders",
                    onClick: () => {
                      setActive(7);
                    },
                  },
                ],
                icon: <AiOutlineOrderedList size={20} />,
              },
              {
                title: "Track Order",
                label: "Track Order",
                key: "Track Order",
                onClick: () => {
                  setActive(9);
                },
                icon: <MdOutlineTrackChanges size={20} />,
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
                title: "Add Address",
                label: "Add Address",
                key: "Add Address",
                onClick: () => {
                  setActive(2);
                },
                icon: <AiOutlineSave size={20} />,
              },
              {
                title: "Saved Address",
                label: "Saved Address",
                key: "Saved Address",
                onClick: () => {
                  setActive(3);
                },
                icon: <AiOutlineSave size={20} />,
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
          {active === 2 && <Address />}
          {active === 3 && <SavedAddress />}
          {active === 4 && <AdminUsers />}
          {active === 5 && <Profile />}
          {active === 6 && <ChangePassword />}
          {active === 7 && <Orders />}
          {active === 8 && <CompletedOrders />}
          {active === 9 && <TrackOrder />}
          {active === 10 && <OutOfStock />}
          {active === 11 && <UserPendingOrders />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserProfile;
