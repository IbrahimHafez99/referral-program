import React, { createContext, useState, useContext } from "react";
import type { AlertProps } from "../types/User";
interface Props {
  children: React.ReactNode;
}

const initial = { type: "" as "", message: "", styles: "" };
interface MyContextValue {
  isAlertActive: boolean;
  setIsAlertActive: React.Dispatch<React.SetStateAction<boolean>>;
  alert: AlertProps;
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
}

const PopupsContext = createContext<MyContextValue>({
  isAlertActive: false,
  setIsAlertActive: () => {},
  alert: initial,
  setAlert: () => {},
});

export const PopupsProdvider = ({ children }: Props) => {
  const [isAlertActive, setIsAlertActive] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>(initial);
  return (
    <PopupsContext.Provider
      value={{ isAlertActive, setIsAlertActive, alert, setAlert }}
    >
      {children}
    </PopupsContext.Provider>
  );
};
export const usePopupsContext = () => useContext(PopupsContext);
