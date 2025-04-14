import MainLayout from "@/mainlayout/MainLayout";
import Home from "@/pages/home/Home";
import LoginPage from "@/pages/login/Login";
import AllProducts from "@/pages/product/AllProducts";
import ProductDetails from "@/pages/product/ProductDetails";
import RegisterPage from "@/pages/register/register";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Cart from "@/pages/cart/Cart";
import Checkout from "@/pages/checkout/CheckOut";
import OrderConfirmation from "@/pages/order/OrderConfirmation";
import UserRoute from "./UserRoute";
import UserDashboardLayout from "@/dashboard/layout/UserDashboardLayout";
import path from "path";
import UserOrders from "@/dashboard/user/UserOrders";
import UserProfile from "@/dashboard/user/UserProfile";
import AdminRoute from "./AdminRoute";
import AdminDashboardLayout from "@/dashboard/layout/AdminDashboardLayout";
import ManageProducts from "@/dashboard/admin/ManageProducts";
import ManageOrders from "@/dashboard/admin/ManageOrders";
import ManageUsers from "@/dashboard/admin/ManageUsers";
import Terms from "@/components/terms/Terms";
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
      { path: "checkout", element: <Checkout></Checkout> },
      { path: "order-confirmation/:id", element: <OrderConfirmation /> },
    ],
      
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {path: '/terms', element: <Terms/>},
    // user dashboard Layout 
    {
     path:'/dashboard/user', element: <UserRoute/>,
     children:[
      {element:<UserDashboardLayout/>,
       children:[
        {
          index: true,
          element: (
            <>
              <UserOrders />
            </>
          ),
        },
        { path: "orders", element: <UserOrders /> },
        {path:"profile", element:<UserProfile/>}
       ]
      }
     ]
    },
     // Admin Dashboard (Protected)
  {
    path: "/dashboard/admin",
    element: <AdminRoute />,
    children: [
      {
        element: <AdminDashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <>
                <ManageProducts />
              </>
            ),
          },
          { path: "manage-products", element: <ManageProducts /> },
          { path: "manage-orders", element: <ManageOrders /> },
          { path: "manage-users", element: <ManageUsers /> },
        ],
      },
    ],
  },
  ]); 