/*
 * @Author: 汪培良 rick_wang@yunquna.com
 * @Date: 2025-01-03 16:57:37
 * @LastEditors: 汪培良 rick_wang@yunquna.com
 * @LastEditTime: 2025-02-02 16:54:23
 * @FilePath: /meeting_room_booking_system_frontend_user/src/page/Menu/Menu.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { Outlet } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from "antd";
import { router } from "../../index.tsx";
import "./menu.css";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "会议室管理",
  },
  {
    key: "2",
    label: "预定管理",
  },
  {
    key: "3",
    label: "用户管理",
    path: "/user_manage",
  },
  {
    key: "4",
    label: "统计",
  },
];

const handleMenuItemClick = (info) => {
  console.log("handleMenuItemClick", info);
  if (info.key === "3") {
    router.navigate("/user_manage");
  }
  //  else {
  //   router.navigate("/user/password_modify");
  // }
};

export function Menu() {
  return (
    <div id="menu-container">
      <div className="menu-area">
        <AntdMenu
          defaultSelectedKeys={["3"]}
          items={items}
          onClick={handleMenuItemClick}
        />
      </div>
      <div className="content-area">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
