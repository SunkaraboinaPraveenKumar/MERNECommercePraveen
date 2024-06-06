import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {
  // const url = "http://localhost:1000/api";
  const url='https://mern-ecommerce-api1.onrender.com/api'
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress,setUserAddress]=useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true
      });
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    };

    fetchProduct();
    userCart();
    getAddress();
  }, [token]);

  useEffect(() => {
    let lstoken = localStorage.getItem('token');
    if (lstoken) {
      setIsAuthenticated(true);
      setToken(lstoken);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      userCart();
    }
  }, [reload, isAuthenticated]);

  const register = async (name, email, password) => {
    const api = await axios.post(`${url}/user/register`, { name, email, password }, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    });
    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  const login = async (email, password) => {
    const api = await axios.post(`${url}/user/login`, { email, password }, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    });
    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setToken(api?.data?.token);
    setIsAuthenticated(true);
    localStorage.setItem("token", api?.data?.token);
    return api?.data;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logout Successfully...", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    setUser(api?.data?.user);
  };

  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(`${url}/cart/add`, { productId, title, price, qty, imgSrc }, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setReload(!reload);
  };

  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    setCart(api?.data?.cart);
  };

  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(`${url}/cart/--qty`, { productId, qty }, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    setReload(!reload);
    setCart(api?.data?.cart);
    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const increaseQty = async (productId, qty) => {
    const api = await axios.post(`${url}/cart/++qty`, { productId, qty }, {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    setReload(!reload);
    setCart(api?.data?.cart);
    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  //remove cart item

  const removeItem = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`,{
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    setReload(!reload);
    setCart(api?.data?.cart);
    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //clear cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`,{
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    setReload(!reload);
    setCart(api?.data?.cart);
    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //add address
  const shippingAddress = async (
    {fullName,address,city,state,country,pincode,phoneNumber}
  ) => {
    const api = await axios.post(`${url}/address/add`,
    {fullName,address,city,state,country,pincode,phoneNumber},
    {
      headers: {
        "Content-Type": "Application/json",
        "Auth": token
      },
      withCredentials: true
    });
    toast.success(api?.data?.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api?.data;
  };

  //get user address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        "Auth":token
      },
      withCredentials: true
    });
    setUserAddress(api?.data?.userAddress);
    console.log(userAddress)
  };
  
  return (
    <AppContext.Provider value={{
      products,
      register,
      login,
      url,
      token,
      isAuthenticated,
      setIsAuthenticated,
      filteredData,
      setFilteredData,
      logout,
      user,
      addToCart,
      cart,
      decreaseQty,
      increaseQty,
      removeItem,
      clearCart,
      shippingAddress,
      userAddress
    }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
