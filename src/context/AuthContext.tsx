import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

interface authData {
  loading: boolean;
  data: string;
  error: string;
}

interface MyContextValue {
  authState: authData;
  setAuthState: React.Dispatch<React.SetStateAction<authData>>;
}

export const AuthContext = createContext<MyContextValue>({
  authState: { loading: false, data: "", error: "" },
  setAuthState: () => {},
});

export const AuthProvider = ({ children }: ChildrenType): ReactElement => {
  const [authState, setAuthState] = useState<authData>({
    loading: false,
    data: "",
    error: "",
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
