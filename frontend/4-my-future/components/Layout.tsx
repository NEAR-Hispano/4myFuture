import React, { Children } from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import useUser from "../hooks/useUser";
import { initContract } from "./near";
import { Contract } from "near-api-js";
import { useNear } from "../hooks/useNear";
import {useAuth} from "../hooks/useAuth";


interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [nearContext, setNearContext] = useNear();
  const [user, setUser] = useUser();
  const [authContext] = useAuth();

  const setNEARContext = async () => {
    const near = await initContract();
    await setNearContext(near);
    try {
      const userId = await near.walletConnection.getAccountId();
      if (typeof userId == "string") {
        // @ts-ignore: Unreachable code error
        const userLog = await near.contract.getUser({ userId });
        setUser(userLog);
        return;
      }
    } catch (e) {
      console.log(e);
      setUser(null);
      console.log(authContext)
      if(authContext) {
        const userId = await near.walletConnection.getAccountId();        
        // @ts-ignore: Unreachable code error
        const userLog = await near.contract.getUser({ userId });
        setUser(userLog);
        return;
      }
    }
  };

  React.useEffect(() => {
    if (!nearContext && !user) {
      setNEARContext();
      return;
    }
    return;
  }, [nearContext, authContext]);

  return (
    <div className="w-screen flex flex-col">
      {nearContext ? (
        <div className="w-screen flex flex-col">
          <Navbar />
          <div className="">{children}</div>
          <Footer /> :
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Layout;
