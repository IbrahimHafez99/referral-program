import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCookies } from "react-cookie";

const NavBar = () => {
  const [cookie] = useCookies(["jwt"]);
  const { logout } = useAuth();
  const [token, setToken] = useState<string | undefined>("");
  useEffect(() => {
    setToken(cookie.jwt);
  }, [cookie.jwt]);
  return (
    <div className="navbar fixed top-0 z-40 bg-primary">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          QRLIX
        </Link>
      </div>
      <div className="flex-none gap-2">
        {token ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" />
              </div>
            </label>
            <nav>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/dashboard" className="justify-between">
                    Dashboard
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href="/settings">Settings</Link>
                </li>
                <li onClick={() => logout()}>
                  <a>Logout</a>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <li className="btn">
            <Link href="/register">Refer Now</Link>
          </li>
        )}
      </div>
    </div>
  );
};

export default NavBar;
