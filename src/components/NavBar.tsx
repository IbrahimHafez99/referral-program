import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCookies } from "react-cookie";

import jwt from "jsonwebtoken";
const NavBar = () => {
  const [cookie] = useCookies(["jwt"]);
  const { logout } = useAuth();
  const [token, setToken] = useState<string | undefined>("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setToken(cookie.jwt);
    const { role } = cookie.jwt ? (jwt.decode(cookie.jwt as string) as any) : 0;
    if (role === 1) {
      setIsAdmin(true);
    }
  }, [cookie.jwt]);
  return (
    <div className="navbar fixed top-0 z-40">
      <div className="flex-1">
        <Link
          href="/"
          className="btn text-[var(--primary-color)] btn-ghost normal-case text-xl"
        >
          QRLIX
        </Link>
      </div>
      <div className="flex-none gap-2">
        {token && (
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
                {isAdmin && (
                  <li>
                    <Link href="/admin/dashboard" className="justify-between">
                      Dashboard
                      <span className="badge">Admin</span>
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/dashboard" className="justify-between">
                    Dashboard
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
        )}
      </div>
    </div>
  );
};

export default NavBar;
