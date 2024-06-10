import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
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
import { getUsers } from "../../redux/user";
import AdminUsers from "./Users";
import { getOrdersAdmin, getOrdersUser } from "../../redux/order";
import CompletedOrders from "./CompleteOrders";
import PendingOrders from "./PendingOrders";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TrackOrder from "./TrackOrder";
import OutOfStock from "./OutOfStock";
import Address from "./Address";
import SavedAddress from "./SavedAddress";
import Headerr from "../layout/Header";
const UserProfile = () => {
  const date = Date().slice(15, 18);

  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(1);
  const { user } = useSelector((state) => state.user?.user);
  const { theme } = useSelector((state) => state.theme);
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  dispatch(getOrdersUser(user?._id));

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
    } else if (date >= 12 && date < 19) {
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
  return (
    <Layout className="overflow-x-hidden">
     <Headerr />
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
                title: "Orders",
                label: "Orders",
                key: "Orders",
                onClick: () => {
                  setActive(7);
                },

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
          {active === 2 && <Address />}
          {active === 3 && <SavedAddress />}
          {active === 4 && <AdminUsers />}
          {active === 5 && <Profile />}
          {active === 6 && <ChangePassword />}
          {active === 7 && <PendingOrders />}
          {active === 8 && <CompletedOrders />}
          {active === 9 && <TrackOrder />}
          {active === 10 && <OutOfStock />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserProfile;
