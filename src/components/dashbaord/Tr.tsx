import useCopyToClipboard from "@/src/hooks/useCopyToClipboard";
import Link from "next/link";
import React from "react";

type TrProps = {
  referral: string;
  key: number;
  index: number;
};

const Tr = ({ index, referral }: TrProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <tr className="hover">
      <th>{index + 1}</th>

      <td>
        <Link
          href={`/dashboard/code/${referral}`}
          className="hover:cursor-pointer hover:underline"
        >
          https://www.qrlix.com/purchases/{referral}
        </Link>
      </td>

      <td>
        <button
          className={`btn btn-accent mr-2 ${
            isCopied.link && "disabled:bg-[#709aa7] disabled:text-white"
          }`}
          disabled={isCopied.link}
          onClick={() =>
            copyToClipboard(`https://www.qrlix.com/purchases/${referral}`)
          }
        >
          {isCopied.link ? "Copied" : "Link"}
        </button>
        <button
          className={`btn btn-accent ${
            isCopied.coupon && "disabled:bg-[#709aa7] disabled:text-white"
          }`}
          disabled={isCopied.coupon}
          onClick={() => copyToClipboard(referral)}
        >
          {isCopied.coupon ? "Copied" : "Coupon"}
        </button>
      </td>
      <td>{referral}</td>
    </tr>
  );
};

export default Tr;
