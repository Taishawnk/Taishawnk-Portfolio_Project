import React from 'react';
import { createRoot } from 'react-dom/client';
import UrlRoutes from './Routes';

const root = createRoot(document.getElementById('root'));
root.render(<UrlRoutes />);













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

