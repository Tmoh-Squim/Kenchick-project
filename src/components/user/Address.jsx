import React, { useState } from "react";
import { Button, Form, Input, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Server_Url } from "../../server";
import { Counties } from "../../utils/Counties";
import { getUser } from "../../redux/user";

const Address = () => {
  const { user } = useSelector((state) => state.user?.user);
  const [county, setCounty] = useState('');
  const [subcounty, setSubcounty] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [data] = useState(['Default', 'Home', 'Office']);
  const [loading, setLoading] = useState(false); 
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      if (!values?.county || !values?.subcounty || !values?.location || !values?.type) {
        toast.error("All fields are required!");
        setLoading(false); 
        return;
      }
      const response = await axios.post(
        `${Server_Url}/auth/delivery-details/${user?._id}`,
        values, {
          headers: {
            'Authorization': token
          }
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(getUser())
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="p-2 flex justify-center w-full h-[90vh] items-center">
      <div className="my-2">
        <h1 className="text-2xl text-center font-semibold">
          Add Address
        </h1>
      </div>
      <Form
        layout="vertical"
        onFinish={(values) => {
          handleUpdate(values);
        }}
        className="800px:w-[50%] w-full"
      >
        <Form.Item name={"county"} initialValue={county}>
          <div className="w-full pb-2">
            <label className="block pb-2">Choose your County</label>
            <select
              name="county"
              id="county"
              value={county}
              onChange={(e) => {
                setCounty(e.target.value);
                setSubcounty(''); 
              }}
              className="800px:w-[95%] w-full border h-[40px] px-2 rounded-[5px]"
            >
              <option value="" className="block border pb-2">
                choose your county
              </option>
              {Counties && Counties?.map((item) => (
                <option
                  className="block pb-2"
                  key={item.isoCode}
                  value={item.isoCode}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </Form.Item>

        <Form.Item name={"subcounty"} initialValue={subcounty}>
          <div className="w-full pb-2">
            <label className="block pb-2">Choose your Sub-County</label>
            <select
              name="subcounty"
              id="subcounty"
              value={subcounty}
              onChange={(e) => setSubcounty(e.target.value)}
              className="800px:w-[95%] border h-[40px] px-2 rounded-[5px] w-full"
            >
              <option value="" className="block border pb-2">
                choose your sub-county
              </option>
              {county &&
                Counties.find((item) => item.name === county)?.sub_counties?.map((item) => (
                  <option
                    className="block pb-2"
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </Form.Item>

        <Form.Item label={"Exact location"} name={"location"} initialValue={location}>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your exact location"
            className="h-[2.5rem] 800px:w-[95%] "
          />
        </Form.Item>
        <Form.Item label={"Address type"} name={"type"} initialValue={type}>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="800px:w-[95%] px-2 border h-[40px] rounded-[5px] w-full"
          >
            <option value="" className="block border pb-2">
              choose address type
            </option>
            {data &&
              data?.map((item) => (
                <option
                  className="block pb-2"
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
          </select>
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          className="px-10 flex justify-center items-center"
          loading={loading} 
        >
          <h1 className="text-[16px] text-center mt-2">Submit</h1>
        </Button>
      </Form>
    </Layout>
  );
};

export default Address;
