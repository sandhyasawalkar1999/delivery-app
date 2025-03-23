import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/storeContext'
import '../Cart/Cart.css'
import './PlaceOrder.css'

import axios from 'axios';
import { useNavigate } from 'react-router';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandlers = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  // const placeOrder = async (e) => {
  //   e.preventDefault();
  //   let orderItems = [];
  //   food_list.map((item) => {
  //     if (cartItems[item._id] > 0) {
  //       let itemInfo = item;
  //       itemInfo["quantity"] = cartItems[item._id];
  //       orderItems.push(itemInfo);
  //     }
  //   })
  //   let orderData = {
  //     address: data,
  //     items: orderItems,
  //     amount: getTotalCartAmount() + 2,
  //   }
  //   let response = await axios.post(url + "/api/orders/place", orderData, { headers: token });
  //   if (response.data.success) {
  //     const { session_url } = response.data;
  //     window.location.replace(session_url);
  //   }
  //   else {
  //     alert("Error");
  //   }
  // }
  const placeOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    let orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20, // Ensure correct total
    };

    console.log("Placing order with:", orderData);

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Order Response:", response.data);

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Error placing order.");
      }
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/')
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }

  }, [token])



  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Infomation</p>
        <div className="multi-fields">
          < input required type="text" name='firstName' onChange={onChangeHandlers} value={data.firstName} placeholder='First Name' />
          < input required type="text" name='lastName' onChange={onChangeHandlers} value={data.lastName} placeholder='Last Name' />
        </div>
        < input required type="email" name='email' onChange={onChangeHandlers} value={data.email} placeholder='Email Address' />
        < input required type="text" name='street' onChange={onChangeHandlers} value={data.street} placeholder='Street' />
        <div className="multi-fields">
          < input required type="text" name='city' onChange={onChangeHandlers} value={data.city} placeholder='city' />
          < input required type="text" name='state' onChange={onChangeHandlers} value={data.state} placeholder='State' />
        </div>
        <div className="multi-fields">
          < input required type="text" name='zipcode' onChange={onChangeHandlers} value={data.zipcode} placeholder='Zip code' />
          < input required type="text" name='country' onChange={onChangeHandlers} value={data.country} placeholder='Country' />

        </div>
        < input required type="text" name='phone' onChange={onChangeHandlers} value={data.phone} placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
            </div>
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder