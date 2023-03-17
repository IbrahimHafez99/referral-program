import Link from "next/link";
import React from "react";
import type { ReactElement } from 'react'
import { NextPageWithLayout } from '../../pages/_app';
type PageLayoutProps = {
  page: React.ReactNode;
};

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-primary">
      <div className="text-white">QRLIX</div>
      <ul>
        <li className="text-white bg-secondary	p-2 rounded">
          <Link href="/register">Refer Now</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;