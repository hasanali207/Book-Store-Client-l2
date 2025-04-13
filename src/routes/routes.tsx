import MainLayout from "@/mainlayout/MainLayout";
import Home from "@/pages/home/Home";
import LoginPage from "@/pages/login/Login";
import AllProducts from "@/pages/product/AllProducts";
import ProductDetails from "@/pages/product/ProductDetails";
import RegisterPage from "@/pages/register/register";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Cart from "@/pages/cart/Cart";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [{
        index: true,
        element: <Home></Home>
      }, 
      { path: "products", element: <AllProducts /> },
      { path: "products/:id", element: <ProductDetails /> },
      {
        path: "cart",
        element: <PrivateRoute />,
        children: [{ index: true, element: <Cart /> }],
      },
    ],
      
    },
    { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  ]); 