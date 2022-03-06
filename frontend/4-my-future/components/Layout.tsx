import React, { Children } from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import useUser from "../hooks/useUser";
import { initContract } from "./near";
import { useNear } from "../hooks/useNear";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [nearContext, setNearContext] = useNear();
  const [user, setUser] = useUser();

  const setNEARContext = async () => {
    const near = await initContract();
    await setNearContext(near);
    console.log("loading context");
    try {
      const userId = await near.walletConnection.getAccountId();
      if (typeof userId == "string") {
        try {
          // @ts-ignore: Unreachable code error
          const userLog = await near.contract.getUser({ userId });
          setUser(userLog);
          return;
        } catch (e) {
          console.log("creating user");
          // @ts-ignore: Unreachable code error
          const newUser = await near.contract.login();
          setUser(newUser);
          return;
        }
      }
    } catch (e) {
      console.log(e);
      setUser(null);
    }
  };

  React.useEffect(() => {
    if (!nearContext && !user) {
      setNEARContext();
      return;
    }
    return;
  }, [nearContext]);

  return (
    <div className="w-full">
      {nearContext ? (
        <div className="">
          <Navbar />
          <div className="mb-20">{children}</div>
          <Footer />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Layout;
