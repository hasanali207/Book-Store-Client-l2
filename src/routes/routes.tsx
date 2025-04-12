import MainLayout from "@/mainlayout/MainLayout";
import Home from "@/pages/home/Home";
import LoginPage from "@/pages/login/Login";
import RegisterPage from "@/pages/register/register";
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [{
        path:"/",
        element: <Home></Home>
      }],
      
    },
    { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  ]); 