import { createBrowserRouter,Route,RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LandingPage from "./components/LandingPage.jsx";
import PokeDetails from "./components/PokeDetails.jsx";
const router= createBrowserRouter([
  {
    path:'/',
    element:<LandingPage/>
  },
  {
    path:'/poke',
    element:<PokeDetails name={'pikachu'}/>
  }
])
createRoot(document.getElementById('root')).render(
   <RouterProvider router={router}>
    <App/>
   </RouterProvider>
)
