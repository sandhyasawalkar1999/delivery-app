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
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Save to localStorage
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
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
      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Save to localStorage
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing from cart:", error.response?.data || error.message);
      }
    }
  };

  // Load cart data from backend
  const loadCartData = async (userToken) => {
    try {
      const response = await axios.get(url + "/api/cart/get", { headers: { token: userToken } });
      const backendCart = response.data.cartData || {};

      // Merge localStorage cart with backend cart
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {};
      const mergedCart = { ...storedCart, ...backendCart };

      setCartItems(mergedCart);
      localStorage.setItem("cartItems", JSON.stringify(mergedCart)); // Ensure storage is up-to-date
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

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
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Load initial data when component mounts
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      } else {
        // Load cartItems only from localStorage if no token is present
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
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
