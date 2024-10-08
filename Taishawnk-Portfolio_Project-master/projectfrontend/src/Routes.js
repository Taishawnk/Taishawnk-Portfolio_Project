import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import Signup from "./user/Signup";
import UserDashboard from './user/UserDashboard';
import Signin from './user/Signin';
import Cart from './core/Cart';


const UrlRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/signin' element={<Signin/>}/>
      <Route element={<PrivateRoutes/>}>{/*private routes have been updated in the new version of react*/}
          <Route  path='/user/dashboard' element={<UserDashboard/>}/>
          <Route path='/cart'  element={<Cart/>}/> 
      </Route> 
    </Routes>
  </Router>
);

export default UrlRoutes;



// root.render(
    

//     document.getElementById('root')
// );


//new ya
// const routes = [
//   {
//     path: '/',
//     exact: true,
//     element: <Home />
//   },

// ];
// export default routes;


/*const URL_Routes = () => {
    return(
        <BRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BRouter>
    )
} */