import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import DefaultLayout from "./components/default-layout/index.tsx";
import Home from "./pages/home/index.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Category from "./pages/category/index.tsx";
import Cart from "./pages/cart/index.tsx";
import Advertise from "./pages/advertise/index.tsx";
import { createStandaloneToast } from '@chakra-ui/react'

const { ToastContainer } = createStandaloneToast()

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/categoria/:categoryId",
        element: <Category />,
      },
      {
        path: "/carrinho",
        element: <Cart />,
      },
      {
        path: "/anuncie/:categoryId",
        element: <Advertise />,
      },
      {
        path: "/anuncie",
        element: <Advertise />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
