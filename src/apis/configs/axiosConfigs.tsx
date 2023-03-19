import axios from "axios";

export const api = axios.create({
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
  // withCredentials: true,
  baseURL: "http://localhost:3000",
});
