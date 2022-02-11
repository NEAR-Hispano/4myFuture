import React from "react";
import { useRouter } from "next/router";
import { Contract, WalletConnection } from "near-api-js";
import Network from '../models/Network';



export type TAuthContext = {
  authContext?: boolean;
  setAuthContext?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = React.createContext<TAuthContext>({});


interface AuthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authContext, setAuthContext] = React.useState<boolean>();
  const authContextHook = React.useContext(AuthContext);
  const hook = authContextHook;

  React.useEffect(() => {
    setAuthContext(hook.authContext);
  }, []);

  return (
    <AuthContext.Provider value={{ authContext, setAuthContext }}>
      {children}
    </AuthContext.Provider>
  );
}
