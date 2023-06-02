import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";


const Menu = () => {
  const CurrentTab = (path) => {
    const location = useLocation();
    if (location.pathname === path) {
      return { color: "CEC0FC" };
    } else {
      return { color: "#FFFFFF" };
    }
  };

  return (
    <div className="nav-bar-wrapper">
      <ul className="inner-nav nav-tabs bg-dark">
        <li className="navz nav-item text-white" style={CurrentTab("/")}>
          <Link  className="inner-navz nav-link" to="/">Home</Link>
        </li>
        <li className="navz nav-item text-white" tabIndex={1} style={CurrentTab("/Cart")}>
          <Link  className="inner-navz nav-link" to="/cart">Cart</Link>
        </li>
        <li className="navz nav-item text-white" tabIndex={1} style={CurrentTab("/user/dashboard")}>
          <Link  className="inner-navz nav-link" to="/user/dashboard">DashBoard</Link>
        </li>

        <li className="navz nav-item text-white" tabIndex={1} style={CurrentTab("/signin")}>
          <Link  className="inner-navz nav-link" to="/signin">Sign In</Link>
        </li>
        <li className="navz nav-item text-white" tabIndex={1} style={CurrentTab("/signup")}>
          <span onClick={() =>{
            signout()
          }} className="inner-navz nav-link text-warning">Sign Out</span>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Menu;


