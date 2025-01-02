/*
 * @Author: 汪培良 rick_wang@yunquna.com
 * @Date: 2024-12-27 16:33:03
 * @LastEditors: 汪培良 rick_wang@yunquna.com
 * @LastEditTime: 2025-01-02 17:06:24
 * @FilePath: /meeting_room_booking_system_frontend_user/src/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Link,
  Outlet,
} from "react-router-dom";
import { Register } from "./page/Register/Register.tsx";
import { Login } from "./page/Login/Login.tsx";
import { UpdatePassword } from './page/UpdatePassword/UpdatePassword.tsx';
// import { ErrorPage } from './ErrorPage';

const routes = [
  {
    path: "/",
    element: <div>index</div>,
    // errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePassword />,
  },
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
