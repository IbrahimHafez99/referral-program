import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import { useCookies } from "react-cookie";

type PageLayoutProps = {
  page: React.ReactNode;
};

const NavBar = () => {
  const [cookie] = useCookies(["jwt"]);
  const { logout } = useAuth();
  const { authState } = useAuthContext();
  const [token, setToken] = useState<string | undefined>("");
  useEffect(() => {
    setToken(cookie.jwt);
  }, []);
  return (
    <nav className="flex justify-between items-center p-4 bg-primary">
      <div className="text-white">QRLIX</div>
      <ul>
        {authState.loading === false &&
          (token ? (
            <li className="text-white bg-secondary	p-2 rounded">
              <button onClick={() => logout()}>Logout</button>
            </li>
          ) : (
            <li className="text-white bg-secondary	p-2 rounded">
              <Link href="/register">Refer Now</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default NavBar;
