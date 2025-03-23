import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/admin_assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/orders/list-orders");
      console.log(response);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      console.log("Changing status for order:", orderId, "to", event.target.value);
      const response = await axios.post(url + "/api/orders/update-status", {
        orderId,
        status: event.target.value,
      });

      if (response.data.success) {
        toast.success("Status updated successfully");
        fetchAllOrders(); // Re-fetch orders to reflect changes
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Added `url` as a dependency

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={order._id} className='order-item'>
            <img src={assets.parcel_icon} alt="parcel-icon" />

            <p className='order-item-food'>
              {order.items.map((item, idx) => (
                idx === order.items.length - 1
                  ? `${item.name} x${item.quantity}`
                  : `${item.name} x${item.quantity}, `
              ))}
            </p>

            <p className="order-item-name">
              {order.address.firstName + " " + order.address.lastName}
            </p>

            <div className="order-item-address">
              <p>{order.address.street},</p>
              <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
            </div>

            <p className="order-item-phone">{order.address.phone}</p>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
