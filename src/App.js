
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom"
import Login from './Components/Login/Login';
import Registeration from './Components/Registeration/Registeration.jsx';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Logout from './Components/Logout/Logout.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';


const routers=createHashRouter([

    {index:true , element:<Login/>},
    {path:'login' , element:<Login/>},
    {path:'layout', element:<ProtectedRoute><Layout/></ProtectedRoute> , children:[
      {index:true , element:<ProtectedRoute><Home/></ProtectedRoute> }
    ]},
    {path:"logout" , element:<Logout/>},
    {path:"registeration" , element:<Registeration/>},
 
])

function App() {
  return (
    <>
    <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
