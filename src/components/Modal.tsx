import React from "react";

type Props = {
  children: React.ReactElement;
  styles?: string;
};

const Modal = ({ children, styles }: Props) => {
  return (
    <div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className={`modal-box relative ${styles}`} htmlFor="">
          {children}
        </label>
      </label>
    </div>
  );
};

export default Modal;
