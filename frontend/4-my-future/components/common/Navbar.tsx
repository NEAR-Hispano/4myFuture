import React from "react";
import { initContract } from "../near";
import { LogOutIcon, LoginIcon } from "../icons";
import { useNear } from "../../hooks/useNear";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import { IoMdNotifications } from "react-icons/io";
import Dropdown from "./dropdown";
import Config from "./config";
import { Menu } from "@headlessui/react";
import Search from "./search";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const [logged, setLogged] = React.useState(false);
  const [user, setUser] = useUser();
  const [nearContext, setNearContext] = useNear();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState([]);
  const [proposals, setProposals] = React.useState([]);
  const init = async () => {
    const { contract } = await initContract();
    // @ts-ignore: Unreachable code error
    contract.getAllProposals().then(setProposals);
  };

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;
    console.log(proposals);
    const newFilter = proposals.filter((value) => {
      if (searchWord === "") return null;
      return value.title.toLowerCase().includes(searchWord);
    });
    setSearchTerm(newFilter);
  };

  const logIn = async () => {
    await nearContext.walletConnection.requestSignIn(
      nearContext.nearConfig.contractName
    );
  
  };


  const logOut = async () => {
    await router.push("/")
    await nearContext.walletConnection.signOut();
    setNearContext(null);
    setUser(null);
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div className="w-full flex h-14 items-center p-2 justify-between shadow-xs bg-[#7B62D9]">
        <div className="ml-8">
          <img
            src="../images/near_logo_wht.svg"
            width={150}
            onClick={() => {
              router.push(`/`);
            }}
          />
        </div>
        <span>{user ? <Search data={proposals} /> : ""}</span>

        {user ? (
          <div className="text-sm flex justify-between w-1/2">
            <div className="flex">
              <button
                className="  px-12 flex items-center justify-center align-middle text-white hover:text-[#251758]"
                onClick={() => {
                  router.push(`/home`);
                }}
              >
                Home
              </button>
              <button
                className="px-6 flex items-center justify-center align-middle text-white hover:text-[#251758]"
                onClick={() => {
                  router.push(`/contribution`);
                }}
              >
                Contributions
              </button>
              <button
                className="px-6 flex items-center justify-center align-middle text-white hover:text-[#251758]"
                onClick={() => {
                  router.push(`/proposals`);
                }}
              >
                Create proposal
              </button>
            </div>

            <div className="flex h-full justify-center items-center align-middle">
              <button onClick={()=> {router.push('/profile')}}>
                <img src={user.picture} className="w-12" />
              </button>
              <button onClick={() => {router.push('/profile')}} className="px-3 hover:text-white">{user.id}</button>
              <button onClick={() => {logOut()}}>
                <LogOutIcon className="w-9 hover:text-[#452ca3]" ></LogOutIcon>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex">
            
            <div className="bg-white font-extrabold h-10 mr-3 rounded-lg flex items-center justify-center align-middle pl-6 pr-6 hover:shadow-lg hover:shadow-[#c9c1c6] font-sans border-2 text-[#7B62D9] ">
              <button
                onClick={() => {
                  logIn();
                }}
                className="flex font-medium text-lg"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;