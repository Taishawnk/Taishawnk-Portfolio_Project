import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './core/Home';

const UrlRoutes = () => (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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