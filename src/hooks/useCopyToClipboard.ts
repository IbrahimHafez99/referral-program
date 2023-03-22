import { useState } from "react";

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState({
    link: false,
    coupon: false,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    if (text.startsWith("https")) {
      setIsCopied((prev) => ({ ...prev, link: true }));
      setTimeout(() => setIsCopied((prev) => ({ ...prev, link: false })), 2000);
    } else {
      setIsCopied((prev) => ({ ...prev, coupon: true }));
      setTimeout(
        () => setIsCopied((prev) => ({ ...prev, coupon: false })),
        2000
      );
    }
  };

  return { isCopied, copyToClipboard };
};

export default useCopyToClipboard;
