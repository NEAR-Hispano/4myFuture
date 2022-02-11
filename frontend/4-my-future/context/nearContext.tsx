import React from "react";
import { useRouter } from "next/router";
import { Contract, WalletConnection } from "near-api-js";
import Network from '../models/Network';


export interface NearContext {
  contract?: Contract;
  walletConnection?: WalletConnection;
  nearConfig?: Network;
}

export type TNearContext = {
  nearContext?: NearContext;
  setNearContext?: React.Dispatch<React.SetStateAction<NearContext>>;
};

export const NEARApiContext = React.createContext<TNearContext>({});


interface NEARApiContextProviderProps {
  children: React.ReactNode;
}

export function NEARApiContextProvider({ children }: NEARApiContextProviderProps) {
  const [nearContext, setNearContext] = React.useState<NearContext>();
  const nearContextHook = React.useContext(NEARApiContext);
  const hook = nearContextHook;

  React.useEffect(() => {
    setNearContext(hook.nearContext);
  }, []);

  return (
    <NEARApiContext.Provider value={{ nearContext, setNearContext }}>
      {children}
    </NEARApiContext.Provider>
  );
}
