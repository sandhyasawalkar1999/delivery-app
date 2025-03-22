import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({ url }) => {

  const url = 'https://delivery-app-wxc1.onrender.com'
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: '',
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      // console.log(response, "after adding food")
      // console.log(response.data.sucess, "after adding food")


      if (response.data.success) {
        setData({
          name: '',
          description: '',
          category: 'Salad',
          price: '',
        });
        setImage(false);
        toast.success("Food item added successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error!");
    }
  };

  return (
    <div className='add'>
      <form action="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type Here' />
        </div>
        <div className="add-product-description">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='write content here...' ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodle">Noodles</option>

            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
          </div>
        </div>

        <button type='submit' className='add-btn' >ADD</button>
      </form>
    </div>
  )
}

export default Add