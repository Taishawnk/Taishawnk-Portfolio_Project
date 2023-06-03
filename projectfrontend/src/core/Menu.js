import React, { Fragment } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleSignout = () => {
    signout(() => {
      navigate("/");
    });
  };

  return (
    <div className="nav-bar-wrapper">
      <ul className="inner-nav nav-tabs bg-dark">
        <li className="navz nav-item text-white" style={CurrentTab("/")}>
          <Link className="inner-navz nav-link" to="/">
            Home
          </Link>
        </li>

        {isAuthenticated() && (
          <Fragment>
            <li className="navz nav-item text-white" tabIndex={1} style={CurrentTab("/user/dashboard")}>
              <Link className="inner-navz nav-link" to="/user/dashboard">
                DashBoard
              </Link>
            </li>
            <li className="navz nav-item text-white" tabIndex={1} style={CurrentTab("/Cart")}>
              <Link className="inner-navz nav-link" to="/cart">
                Cart
              </Link>
            </li>
          </Fragment>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="navz nav-item text-white" tabIndex={1} style={CurrentTab("/signin")}>
              <Link className="inner-navz nav-link" to="/signin">
                Sign In
              </Link>
            </li>
            <li className="navz nav-item text-white" tabIndex={1} style={CurrentTab("/signUp")}>
              <Link className="inner-navz nav-link" to="/signUp">
                Sign Up
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li>
            <Link className="spn-signout nav-link" to="/" onClick={handleSignout}>
              SignOut
            </Link>
          </li>
        )}
      </ul>
      <Outlet />
    </div>
  );
};

export default Menu;



// 
{/* <li><span onClick={() =>{
  signout(() => {
    <Navigate to="/"/>
  })
}} className="inner-navz nav-link text-warning">Sign Out</span>
</li> */}