/*
 * @Author: 汪培良 rick_wang@yunquna.com
 * @Date: 2025-01-02 16:49:05
 * @LastEditors: 汪培良 rick_wang@yunquna.com
 * @LastEditTime: 2025-02-01 12:22:19
 * @FilePath: /meeting_room_booking_system_frontend_user/src/interfaces.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A8
 */
import axios from "axios";
import { message } from "antd";
import { RegisterUser } from "../page/Register/Register.tsx";
import { UserInfo } from "../pages/InfoModify/InfoModify.tsx";
import { UpdatePassword } from "../page/PasswordModify/PasswordModify.tsx";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3008/",
  timeout: 3000,
});

async function refreshToken() {
  const res = await axiosInstance.get("/user/admin/refresh", {
    params: {
      refresh_token: localStorage.getItem("refresh_token"),
    },
  });
  localStorage.setItem("access_token", res.data.access_token);
  localStorage.setItem("refresh_token", res.data.refresh_token);
  return res;
}
axiosInstance.interceptors.request.use(function(config) {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.authorization = "Bearer " + accessToken;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("response", response);
    return response;
  },
  async (error) => {
    let { data, config } = error.response;
    console.log("error", data, config);
    if (data.code === 401 && !config.url.includes("/user/admin/refresh")) {
      const res = await refreshToken();

      if (res.status === 200) {
        return axios(config);
      } else {
        message.error(res.data);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } else {
      return error.response;
    }
  }
);

export async function login(username: string, password: string) {
  return await axiosInstance.post("/user/login", {
    username,
    password,
  });
}

export async function registerCaptcha(address: string) {
  return await axiosInstance.get("/email/register-captcha?address=" + address);
}

export async function register(registerUser: RegisterUser) {
  return await axiosInstance.post("/user/register", registerUser);
}

export async function userSearch(
  username: string,
  nickName: string,
  email: string,
  pageNo: number,
  pageSize: number
) {
  return await axiosInstance.get("/user/list", {
    params: {
      username,
      nickName,
      email,
      pageNo,
      pageSize,
    },
  });
}

export async function getUserInfo() {
  return await axiosInstance.get("/user/info");
}

export async function updateInfo(data: UserInfo) {
  return await axiosInstance.post("/user/admin/update", data);
}

export async function updateUserInfoCaptcha(email: string) {
  return await axiosInstance.get("/user/update/captcha", {
    params: {
      address: email,
    },
  });
}

export async function updatePasswordCaptcha(email: string) {
  return await axiosInstance.get("/user/update_password/captcha", {
    params: {
      address: email,
    },
  });
}

export async function updatePassword(data: UpdatePassword) {
  return await axiosInstance.post("/user/admin/update_password", data);
}
