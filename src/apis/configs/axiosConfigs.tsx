import axios from "axios";
import Cookies from "js-cookie";
export const api = axios.create({
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
  // withCredentials: true,
  baseURL: "http://localhost:3000",
});
