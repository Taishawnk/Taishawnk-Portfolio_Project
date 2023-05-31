//our protected routes will go here meaning no one that dosnt and shouldnt have access can acces them
//react router v6 https://www.youtube.com/watch?v=2k8NleFjG7I will not work certain this 

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoutes = () => {
    return isAuthenticated() ? <Outlet/> : (
      <Navigate to="/signin" />
    );
  };

export default PrivateRoutes;
