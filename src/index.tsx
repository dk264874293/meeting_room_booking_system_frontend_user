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
import { Menu } from "./page/Menu/Menu.tsx";
import { Register } from "./page/Register/Register.tsx";
import { Index } from "./page/Index/Index.tsx";
import { Login } from "./page/Login/Login.tsx";
import { UpdatePassword } from "./page/UpdatePassword/UpdatePassword.tsx";
import { ErrorPage } from "./page/ErrorPage/ErrorPage.tsx";
import { UserManage } from "./page/UserManage/UserManage.tsx";
import { ModifyMenu } from "./page/ModifyMenu/ModifyMenu.tsx";
import { InfoModify } from "./page/InfoModify/InfoModify.tsx";
import { PasswordModify } from "./page/PasswordModify/PasswordModify.tsx";

const routes = [
  {
    path: "/",
    element: <Index></Index>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Menu></Menu>,
        children: [
          {
            path: "user_manage",
            element: <UserManage />,
          },
        ],
      },
      {
        path: "/user",
        element: <ModifyMenu></ModifyMenu>,
        children: [
          {
            path: "info_modify",
            element: <InfoModify />,
          },
          {
            path: "password_modify",
            element: <PasswordModify />,
          },
        ],
      },
    ],
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
export const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
