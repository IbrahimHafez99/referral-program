import { LinkAPI } from "@/src/apis/linkAPI";
import useCopyToClipboard from "@/src/hooks/useCopyToClipboard";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useCookies } from "react-cookie";
type TrProps = {
  referral: string;
  key: number;
  index: number;
  setLinks: Dispatch<SetStateAction<{ referral: string }[]>>;
};

const Tr = ({ index, referral, setLinks }: TrProps) => {
  const [cookie] = useCookies(["jwt"]);
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleReferralDelete = async (referral: string) => {
    try {
      const res = await LinkAPI.delete(cookie.jwt, referral);
      if (res.status === 204) {
        setLinks((prev) => prev.filter((link) => link.referral !== referral));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <td>
        <button onClick={() => handleReferralDelete(referral)}>
          <AiOutlineDelete />
        </button>
      </td>
    </tr>
  );
};

export default Tr;
