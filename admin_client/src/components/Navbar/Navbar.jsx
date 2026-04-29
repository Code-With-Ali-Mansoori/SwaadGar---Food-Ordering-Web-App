import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import StoreContext from "../../context/admin_context_create.jsx";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate();
  const {token, admin, setAdmin, setToken } = useContext(StoreContext);
  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken("");
    setAdmin(false);
    toast.success("Logout Successfully")
    navigate("/");
  }
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      {token && admin ? (
        <p className="login-conditon" onClick={logout}>Logout</p>
      ) : (
        <p className="login-conditon" onClick={()=>navigate("/")}>Login</p>
      )}

      <div className='admin-logo'>
      <img className="profile" src='https://static.vecteezy.com/system/resources/previews/047/825/963/non_2x/chef-colored-flat-icon-against-transparent-background-free-png.png' alt="" />
      <small>Admin</small>
      </div>
    </div>
  );
};

export default Navbar;
