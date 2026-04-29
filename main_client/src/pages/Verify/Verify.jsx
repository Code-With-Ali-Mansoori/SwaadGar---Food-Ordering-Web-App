import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import StoreContext from "../../context/create_storeContex";
import axios from 'axios';
import { toast } from "react-toastify";
import { sendOrderConfirmation } from '../../utils/emailService';

const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    // Extracts 'success' and 'orderId' sent from Stripe session callback
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const {url} =useContext(StoreContext);

    const navigate= useNavigate();

    const verifyPayment=async()=>{
        const response= await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            // Sending email receipt
            if (response.data.order) {
              await sendOrderConfirmation(response.data.order);
            }
            navigate("/myorders");
            toast.success("Order Placed Successfully");
        }else{
            toast.error("Something went wrong");
            navigate("/");
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify
