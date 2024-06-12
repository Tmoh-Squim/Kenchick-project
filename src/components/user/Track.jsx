import React from 'react'
import Headerr from "../layout/Header"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Track = () => {
    const location = useLocation();
    const order = location.state.order;
    const {user} = useSelector((state)=>state.user?.user);

  return (
    <div >
        <Headerr />

        <div className='w-full h-[90vh] flex justify-center items-center'>
            <h1 className='text-xl text-center'>
            Hello {user?.name}! Your Order is {order?.status}
            </h1>
        </div>
    </div>
  )
}

export default Track