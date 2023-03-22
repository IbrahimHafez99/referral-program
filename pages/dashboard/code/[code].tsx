import React from "react";
import { useRouter } from "next/router";
const Code = () => {
  const router = useRouter();
  return <div>{router.query.code}</div>;
};

export default Code;
