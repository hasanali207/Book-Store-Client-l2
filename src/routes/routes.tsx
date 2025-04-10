import MainLayout from "@/mainlayout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
    },
  ]); 