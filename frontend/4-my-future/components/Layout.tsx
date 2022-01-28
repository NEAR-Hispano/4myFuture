import React, { Children } from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { initContract } from "./near";
import { Contract } from "near-api-js";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {

  const isLoggedIn = useAuth();
  const [user, setUser] = useUser();
  const [contract, setContract] = React.useState<Contract>(null);
  const init = async() => {
      const { contract } = await initContract();
      setContract(contract);
  }

  React.useEffect(() => {
    init();
    if (isLoggedIn) {
      if (!user && contract && setUser) {
          // @ts-ignore: Unreachable code error
            contract.getUser({'lexdev.testnet': any})
        }
    }
  }, [isLoggedIn, contract]);

  return (
    <div className="w-screen flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
