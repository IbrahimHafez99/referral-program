import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("jwt");
export const api = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  withCredentials: true,
  baseURL: "http://localhost:3000",
});
