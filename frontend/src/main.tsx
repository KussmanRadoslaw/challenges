import { StrictMode } from 'react'
import  ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Authentication, { PageType } from './pages/Authentication';

let router = createBrowserRouter([
  {
    path: "/",
    element: <App/> ,
    
  },
  {
    path: "/login",
    element: <Authentication pageType={PageType.LOGIN}/>,
    
  },
  {
    path: "/register",
    element: <Authentication pageType={PageType.REGISTER}/>,
    
  },
]);

// ReactDOM.createRoot(root).render(
//   <RouterProvider router={router} />,
// );
const root = document.getElementById('root')

if (!root) throw new Error('Element #root nie został znaleziony w index.html')

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
