import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Url_Routes from './Routes';

const root = createRoot(document.getElementById('root'));
root.render(<Url_Routes />);













// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <Routes>
//       {routes.map(route => (
//         <Route
//           key={route.path}
//           path={route.path}
//           element={route.element}
//         />
//       ))}
//     </Routes>
//   </BrowserRouter>
// );

