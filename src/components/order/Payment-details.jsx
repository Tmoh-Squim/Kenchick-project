import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Server } from "../../server";
import { useNavigate } from "react-router-dom";
import Ratings from "../../utils/Rating";
import { AiOutlineClose } from "react-icons/ai";
import { getTotal, removeFromCart } from "../../redux/cart";
import { Button, Card, Steps } from "antd";
import { toast } from "react-toastify";
import { Counties } from "../../utils/Counties";

const PaymentDetails = () => {
  const { user } = useSelector((state) => state.user?.user);
  const cart = useSelector((state)=>state.cart);
  const { cartItem, cartTotalAmount } = useSelector((state) => state.cart);
  const [county, setCounty] = useState("");
  const [district, setDistrict] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  useEffect(() => {
    setDeliveryDetails({
      county: county,
      district: district,
      location: location,
    });
  }, [county, district, location]);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!county || !district || !location) {
        setLoading(false);
        return setError(true);
      } else {
        const newOrder = {
          cart: cartItem,
          user: user,
          deliveryDetails: deliveryDetails,
          totalPrice: cartTotalAmount,
        };

        if (deliveryDetails === "") {
          return toast.error("Delivery details are required!");
        }
        navigate('/payment',{state:newOrder})

      }
    } catch (error) {
      toast.error("Something went wrong! please try again later");
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    dispatch(getTotal())
  },[cart,dispatch])

  return (
    <>
      <div className="800px:px-4 px-2 bg-slate-100 w-full ">
        <div className="py-2">
          <h1 className="text-2xl text-black text-center">
            Hello{" "}
            <span className="text-black font-semibold">{user?.name} </span>
            fill in your delivery details to continue
          </h1>
        </div>

        <Card className="800px:w-[40%] w-full 800px:mx-auto">
          <Steps
            current={1}
            items={[
              {
                title: "Add to cart",
                description: "",
              },
              {
                title: "Delivery details",
                description: "",
              },
              {
                title: "Payment",
                description: "",
              },
            ]}
          />
        </Card>

        <div className="800px:flex block justify-center mt-4 items-center h-screen 800px:h-[100vh]">
          <div className="bg-white py-4 rounded-md px-2 800px:mx-4 block my-4 800px:w-[45%] 800px:h-[75vh] 800px:my-0">
          <div className="w-full pb-2">
            <label className="block pb-2">Choose your County</label>
            <select
              name="county"
              id="county"
              value={county}
              onChange={(e) => {
                setCounty(e.target.value);
                setDistrict(''); 
              }}
              className="800px:w-[95%] w-full px-2 border h-[40px] rounded-[5px]"
            >
              <option value="" className="block border pb-2 px-2">
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

          <div className="w-full pb-2">
            <label className="block pb-2">Choose your Sub-County</label>
            <select
              name="subcounty"
              id="subcounty"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
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

            <div className="block py-2 800px:w-[95%] w-full">
              <div>
                <label htmlFor="county">
                  Enter Exact Location <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Enter your exact location"
                value={location}
                className={`${
                  error ? "outline-red-200" : ""
                } outline-none px-2 h-[2.5rem] my-2  w-full rounded-lg bg-slate-100`}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="block py-2">
              <div></div>
              <select
                name="saved"
                id="saved"
                value={selectedDelivery}
                onChange={(e) => {
                  const selectedType = e.target.value;
                  setSelectedDelivery(selectedType);
                  const selectedDeliveryDetails = user?.deliveryDetails.find(
                    (detail) => detail.type === selectedType
                  );
                  if (selectedDeliveryDetails) {
                    setCounty(selectedDeliveryDetails.county);
                    setDistrict(selectedDeliveryDetails.subcounty);
                    setLocation(selectedDeliveryDetails.location);
                  }
                }}
                className="w-full py-2 px-2 rounded-lg 800px:w-[95%]  bg-slate-100"
              >
                <option value="">Choose from saved</option>
                {user?.deliveryDetails.map((detail, index) => (
                  <option
                    key={index}
                    value={detail.type}
                    onChange={(e) => setSelectedDelivery(e.target.value)}
                  >
                    {detail.type}
                  </option>
                ))}
              </select>
            </div>

            <Button
              className="bg-blue-500 px-4 mt-2 800px:mt-4 py-2 w-full h-[2.5rem] font-semibold text-white rounded-lg cursor-pointer"
              onClick={handleSubmit}
              loading={loading}
            >
              Submit
            </Button>
          </div>

          <div className="bg-white rounded-md relative py-2 800px:mt-[1.2rem] px-2 800px:mx-4 800px:w-[33%]">
            <div>
              <h1 className="text-xl text-black font-semibold mx-2">
                Cart summary
              </h1>
            </div>
            <div className=" 800px:h-[68vh] pb-[1rem] overflow-y-scroll ">
              {cartItem.map((item, index) => (
                <div key={index} className="my-2 mb-3 px-2 ">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <img
                        src={`${Server}/${item.image}`}
                        alt={item.name}
                        className="w-[110px] h-[110px] cursor-pointer"
                        onClick={() => {
                          navigate(`/product-details/${item._id}`, {
                            state: { product: item },
                          });
                        }}
                      />
                      <div
                        className="mx-2 block cursor-pointer"
                        onClick={() => {
                          navigate(`/product-details/${item._id}`, {
                            state: { product: item },
                          });
                        }}
                      >
                        <h1>
                          {item.title.length > 18
                            ? item?.title.slice(0, 18) + "..."
                            : item?.title}
                        </h1>
                        <h1 className="my-">
                          Ksh {item.price} * {item.qty}
                        </h1>
                        <h1 className="my-0.5">
                          total: Ksh {item.price * item.qty}
                        </h1>

                        <Ratings rating={item.rating?.rate} />
                      </div>
                    </div>

                    <div
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <AiOutlineClose size={28} />
                    </div>
                  </div>
                </div>
              ))}
              <div className=" 800px:bottom-[8px] 800px:right-[1.5rem] z-50 bottom-2 right-2 absolute">
                <h1 className="text-xl font-semibold">
                  Total: Ksh {cartTotalAmount}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
