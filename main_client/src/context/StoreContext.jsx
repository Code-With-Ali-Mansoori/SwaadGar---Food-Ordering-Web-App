import axios from "axios";
import {useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import StoreContext from "../context/create_storeContex";

// https://food-delivery-backend-5b6g.onrender.com => Backend deployed url
// http://localhost:4000 => Our Local backend url

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const url = import.meta.env.VITE_BACKEND_URL ; // Use environment variable
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {


    if (!cartItems?.[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));

    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    }
    if (token) {
      const response = await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("item Added to Cart")
      } else {
        toast.error("Something went wrong")
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response = await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("item Removed from Cart")
      } else {
        toast.error("Something went wrong")
      }
    }
  };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = food_list.find((product) => product._id === item);
  //       totalAmount += itemInfo.price * cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // };

  const getTotalCartAmount = () => {
    if (!food_list.length) return 0;

    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);

        if (itemInfo) {
          totalAmount += itemInfo.amount * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");

    if (response.data.success) {
      setFoodList(response.data.data);  // ✅ direct set
    } else {
      alert("Error! Products are not fetching..");
    }
  };

  // const fetchFoodList = async () => {
  //   const response = await axios.get(url + "/api/food/list");
  //   if (response.data.success) {

  //     response.data.data.forEach((item) => {
  //        setFoodList((prev) => [...prev, item]);
  //     });

  //     console.log(response.data.data);

  //   } else {
  //     alert("Error! Products are not fetching..");
  //   }
  // };

  const loadCardData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(food_list.map(item => item.dish_category))];
    return uniqueCategories.filter(cat => cat).sort();
  }, [food_list]);

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
    categories,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
