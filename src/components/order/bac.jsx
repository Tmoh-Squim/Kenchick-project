import { Button, Card, Layout, Steps } from 'antd'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Server_Url } from '../../server';
import axios from 'axios';

const token = localStorage.getItem('token');
const Payment = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [active,setActive] = useState(1);
    const location = useLocation()
    const newOrder = location.state


    const handleSubmit = async () => {
        try {
          setLoading(true);
         
            const response = await axios.post(
              `${Server_Url}/order/create-order`,
              newOrder,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
    
            if (response.data.success) {
              toast.success(response.data.message);
              localStorage.removeItem("cart");
              navigate("/payment");
              window.location.reload();
            } else {
              toast.error(response.data.message);
            }
        } catch (error) {
          toast.error("Something went wrong! please try again later");
        } finally {
          setLoading(false);
        }
      };

      const handleLipaNaMpesa = async ()=>{
        try {
            
        } catch (error) {
            toast.error('Something went wrong')
        }
      }
  return (
   <Layout className='px-2 bg-slate-100 h-[100vh] w-full'>
     <Card className="800px:w-[40%] w-full 800px:mx-auto my-2 h-[100px]">
          <Steps
            current={2}
            items={[
              {
                title: "Add to cart",
                description: "",
              },
              {
                title: "Payment details",
                description: "",
              },
              {
                title: "Payment",
                description: "",
              },
            ]}
          />
        </Card>
        

       <div className='flex flex-col gap-5 bg-white 800px:w-[50%] px-6 py-2 rounded-lg  w-full'>
        <div>
          <div  className='cursor-pointer flex justify-between items-center' onClick={()=>setActive(1)}>
          <h1 className='text-xl'>Pay with card</h1>

<div className={`w-[16px] h-[16px] rounded-full border-black border-2 flex justify-center items-center`}>
    {
        active === 1 && (
            <div className={`w-[8px] h-[8px] rounded-full border-red-400 bg-red-400 border-2`}>

            </div>
        )
    }
</div>
          </div>
            {
                active === 1 && (
                    <div className='my-2'>
                        <Button className='bg-red-400 rounded-lg px-4 font-semibold text-white text-[18px] h-[2.5rem]'>
                            Pay Now
                        </Button>
                    </div>
                )
            }
        </div>
        <div >
           <div className='cursor-pointer flex justify-between items-center' onClick={()=>setActive(2)}>
           <h1 className='text-xl'>
                Lipa na mpesa
            </h1>
            <div className={`w-[16px] h-[16px] rounded-full border-black border-2 flex justify-center items-center`}>
                {
                    active === 2 && (
                        <div className={`w-[8px] h-[8px] rounded-full border-red-400 bg-red-400 border-2`}>

                        </div>
                    )
                }
            </div>
           </div>
           {
                active === 2 && (
                    <div className='my-2'>
                        <Button className='bg-red-400 rounded-lg px-4 font-semibold text-white text-[18px] h-[2.5rem]' onClick={handleLipaNaMpesa}>
                            Pay Now
                        </Button>
                    </div>
                )
            }
        </div>
       </div>

   </Layout>
  )
}

export default Payment