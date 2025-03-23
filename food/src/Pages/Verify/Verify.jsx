import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router'
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/orders/verify", { success, orderId });
      console.log(response);
      if (response.data.success) {
        navigate("/myorders");
      }
      else {
        navigate("/");
      }
    }
    catch (err) {
      console.error(err);
      alert('Failed to verify payment');
    }
  }

  useEffect(() => {
    verifyPayment();
  }, [])

  console.log(success, orderId)


  return (
    <div className='verify'>
      <div className="spinner">

      </div>

    </div>
  )
}

export default Verify