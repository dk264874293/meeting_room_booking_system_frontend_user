/*
 * @Author: 汪培良 rick_wang@yunquna.com
 * @Date: 2025-01-02 16:49:05
 * @LastEditors: 汪培良 rick_wang@yunquna.com
 * @LastEditTime: 2025-01-02 18:00:49
 * @FilePath: /meeting_room_booking_system_frontend_user/src/interfaces.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A8
 */
import axios from "axios";
import { RegisterUser } from "../page/Register/Register.tsx";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3008/",
  timeout: 3000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return error.response;
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
