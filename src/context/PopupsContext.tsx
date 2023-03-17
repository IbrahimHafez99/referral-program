import React, { createContext, useState, useContext } from "react";

interface Props {
  children: React.ReactNode;
}

interface MyContextValue {
  isAlertActive: boolean;
  setIsAlertActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupsContext = createContext<MyContextValue>({
  isAlertActive: false,
  setIsAlertActive: () => {},
});

export const PopupsProdvider: React.FC<Props> = ({ children }) => {
  const [isAlertActive, setIsAlertActive] = useState<boolean>(false);
  return (
    <PopupsContext.Provider value={{ isAlertActive, setIsAlertActive }}>
      {children}
    </PopupsContext.Provider>
  );
};
export const usePopupsContext = () => useContext(PopupsContext);
