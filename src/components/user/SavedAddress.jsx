import { Layout, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Server_Url } from "../../server";
import axios from "axios";
import { getUser } from "../../redux/user";

const token = localStorage.getItem("token");
const SavedAddress = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.user?.user);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setData(user?.deliveryDetails);
  }, []);

  const handleDeleteDetails = async (id) => {
    try {
      const response = await axios.post(
        `${Server_Url}/auth/remove-address/${user?._id}`,
        { addressId: id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(getUser());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <Table
        dataSource={data}
        scroll={{ x: true }}
        columns={[
          {
            title: "Delivery Id",
            key: "_id",
            dataIndex: "_id",
            responsive: ["md"],
          },
          {
            title: "Type",
            key: "type",
            dataIndex: "type",
            responsive: ["md"],
          },
          {
            title: "County",
            key: "county",
            dataIndex: "county",
            responsive: ["md"],
          },
          {
            title: "Sub-County",
            key: "subcounty",
            dataIndex: "subcounty",
            responsive: ["md"],
          },
          {
            title: "Actions",
            key: "actions",
            render: (id) => {
              return (
                <div className="flex">
                  <AiOutlineEye size={30} className="cursor-pointer" />
                  <AiOutlineDelete
                    size={28}
                    className="mx-4 cursor-pointer"
                    onClick={() => {
                      setId(id);
                      setOpen(true);
                    }}
                  />
                </div>
              );
            },
          },
        ]}
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => handleDeleteDetails(id)}
        title="Do you want to delete the details?"
      />
    </Layout>
  );
};

export default SavedAddress;
