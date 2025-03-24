import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = ({ url }) => {

  const [list, setList] = useState([]);


  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.data) {
      setList(response.data.data);
    }
    else {
      toast.error("Error fetching list");
    }

  }

  const removeFood = async (foodId) => {
    console.log("Deleting food item with ID:", foodId); // Debugging log
    try {
      const response = await axios.delete(`${url}/api/food/delete/${foodId}`);

      if (response.data.success) {
        toast.success("Food item removed successfully");
        await fetchList();  // Refresh list after deletion
      } else {
        toast.error("Error removing food item");
      }
    } catch (err) {
      console.error("Delete request error:", err.response?.data || err.message);
      toast.error("Error removing food item");
    }
  }
  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          console.log(item);
          return (
            <div key={index} className='list-table-format'>
              <img loading="lazy" src={`${url}/images/${item.image}`} alt="item image" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List