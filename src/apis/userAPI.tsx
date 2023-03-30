import { api } from "./configs/fetchConfig";

export const userAPI = {
  get: async function (token: string, page?: number) {
    try {
      const response = await api(
        "/api/admin/user",
        token,
        "GET",
        undefined,
        `/?page=${page}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  count: async function (token: string) {
    try {
      const response = await api("/api/admin/user-count", token, "GET");
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  suspend: async function (token: string, state: boolean, email: string) {
    try {
      const response = await api("/api/admin/user", token, "PATCH", {
        email,
        state,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
