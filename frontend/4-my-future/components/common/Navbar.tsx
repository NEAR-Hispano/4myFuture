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

  const createUser = async () => {
    const { contract } = await initContract();
    //@ts-ignore: Unreachable code error
    contract.createUser();
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

  const signUp = async () => {
    // @ts-ignore: Unreachable code error
    nearContext.contract.createUser();
  };

  const logOut = async () => {
    await nearContext.walletConnection.signOut();
    setNearContext(null);
    setUser(null);
    router.push("/");
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div className="w-full flex h-16 items-center p-2 justify-between shadow-xs bg-[#7B62D9]">
        <div className="ml-8">
          <img
            src="../images/near_logo_wht.svg"
            width={200}
            onClick={() => {
              router.push(`/`);
            }}
          />
        </div>
        <span>{user ? <Search data={proposals} /> : ""}</span>

        {user ? (
          <div className="text-xl flex justify-between w-1/2">
            <div className="flex">
              <button
                className="  px-12 flex items-center justify-center align-middle text-white hover:border-x-2 hover:border-[#9a86e0]"
                onClick={() => {
                  router.push(`/home`);
                }}
              >
                Home
              </button>
              <button
                className="px-6 flex items-center justify-center align-middle text-white hover:border-x-2 hover:border-[#9a86e0]"
                onClick={() => {
                  router.push(`/contribution`);
                }}
              >
                Contributions
              </button>
              <button
                className="px-6 flex items-center justify-center align-middle text-white hover:border-x-2 hover:border-[#9a86e0]"
                onClick={() => {
                  router.push(`/proposals`);
                }}
              >
                Create proposal
              </button>
              <button
                onClick={() => {
                  router.push(`/proposals`);
                }}
              ></button>
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
            <div className="font-thin border-2 border-white h-12 mr-3 rounded-lg flex items-center justify-center align-middle pl-6 pr-6 hover:shadow-2xl font-sans text-white ">
              <button
                onClick={() => {
                  logIn();
                }}
                className="flex text-2xl"
              >
                Login
                <LoginIcon className="w-7 ml-4 flex align-middle justify-center items-center"></LoginIcon>
              </button>
            </div>
            <div className="bg-white font-extrabold h-12 mr-3 rounded-lg flex items-center justify-center align-middle pl-6 pr-6 hover:shadow-lg hover:shadow-[#c9c1c6] font-sans border-2 text-[#7B62D9] ">
              <button
                onClick={() => {
                  signUp();
                }}
                className="flex font-medium text-2xl"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;