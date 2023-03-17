import { api } from "./configs/axiosConfigs";
export const LoginAPI = {
  login: async function ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = { user: { email, password } };
    const response = await api.request({
      url: `api/auth/login`,
      method: "POST",
      data: user,
    });
    return response;
  },
};
