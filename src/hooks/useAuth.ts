import { useRouter } from "next/router";
import { LoginAPI } from "../apis/loginAPI";
import { useAuthContext } from "../context/AuthContext";
import { usePopupsContext } from "../context/PopupsContext";
import type { LoginFormData } from "../types/UserLoginForm";
import { useCookies } from "react-cookie";
export const useAuth = () => {
  const [_, setCookie, removeCookie] = useCookies(["jwt"]);
  const router = useRouter();
  const { setAuthState } = useAuthContext();
  const { setIsAlertActive, setAlert } = usePopupsContext();
  async function login(formData: LoginFormData) {
    try {
      setAuthState((prevAuthState) => ({ ...prevAuthState, loading: true }));
      const response = await LoginAPI.login({
        email: formData.email,
        password: formData.password,
      });
      setCookie("jwt", response.data.token);
      setAuthState((prevAuthState) => ({
        ...prevAuthState,
        loading: false,
        data: response.data.token,
      }));
      setAlert({ message: "Loggedin Successfully", type: "success" });
      setIsAlertActive(true);
      setTimeout(() => {
        setIsAlertActive(false);
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      setAlert({
        message: error.response.data.message as string,
        type: "error",
      });
      setIsAlertActive(true);
      setTimeout(() => {
        setIsAlertActive(false);
      }, 1000);
      console.error(error);
    }
  }
  function logout() {
    removeCookie("jwt");
    router.push("/login");
  }
  return { login, logout };
};
