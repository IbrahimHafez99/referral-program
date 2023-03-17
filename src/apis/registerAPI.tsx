import { api } from "./configs/axiosConfigs";
import type { User } from "../types/User";
export const RegisterAPI = {
  register: async function ({ name, email, password, phoneNumber }: User) {
    const user = { user: { name, email, password, phoneNumber } };
    const response = await api.request({
      url: `api/auth/register`,
      method: "POST",
      data: user,
    });
    return response;
  },
};
