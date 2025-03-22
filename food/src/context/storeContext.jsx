import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const url = "https://delivery-app-wxc1.onrender.com";

  // Function to add item to cart & update in backend
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  // Function to remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId]; // Remove when count reaches 0
      }
      return updatedCart;
    });

    if (token) {
      try {
        const response = await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        console.log("Remove API Response:", response.data);
      } catch (error) {
        console.error("Error removing from cart:", error.response?.data || error.message);
      }
    }
  };

  const loadCardData = async (token) => {
    try {

      const response = await axios.get(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
      console.log("response", response.data);

    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  }



  // Function to calculate total cart amount
  const getTotalCartAmount = () => {
    if (!cartItems || typeof cartItems !== "object") return 0; // Prevent error

    return Object.keys(cartItems).reduce((total, itemId) => {
      const itemInfo = food_list.find((product) => product._id === itemId);
      return itemInfo ? total + itemInfo.price * cartItems[itemId] : total;
    }, 0);
  };

  // Fetch food list from API
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      // console.log(response);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  //loadcartdata


  // Load initial data when component mounts
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"));
      }

    };
    loadData();
  }, []);

  // Context value
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
