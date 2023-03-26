import { api } from "./configs/fetchConfig";
export const LinkAPI = {
  get: async function (token: string) {
    const response = await fetch("http://localhost:3000/api/link/get", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // credentials: 'include',
    });
    return await response.json();
  },
  create: async function (token: string, link?: string) {
    const response = await api("/api/link/create", token, "POST", { link });
    return response;
  },
};
