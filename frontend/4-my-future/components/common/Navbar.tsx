import React from "react";
import { initContract } from "../near";
import { LogOutIcon, LoginIcon } from "../icons";
import { useNear } from "../../hooks/useNear";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import Proposal from "../../models/Proposal";
import SearchBar from "../home/SearchBar";
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
}

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

  const signUp = async() => {
    // @ts-ignore: Unreachable code error
    nearContext.contract.createUser();
  }

  const logOut = async () => {
    await nearContext.walletConnection.signOut();
    setNearContext(null);
    setUser(null);
    router.push("/");
  };


  React.useEffect(() => {
    init()
  
  }, []);

  return (
    <div>
      <div className="w-full flex flex-row items-center p-2 justify-between shadow-xs bg-[#7B62D9]">
        <div className="ml-8 cursor-pointer">
          <img
            src="../images/near_logo_wht.svg"
            width={200}
            onClick={() => {
              router.push(`/`);
            }}
          />
        </div>
         <span className="w-full md:w-1/3 h-10  border border-[#7B62D9] text-sm rounded-full flex">
           {user? 
            <Search data={proposals} />:
           ""}
           
           
       
        </span> 
      
        {user ? (
          <div className="navbar-menu hidden lg:block lg:w-2/5 lg:text-right">
            <a
              className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-indigo-600 cursor-pointer"
              onClick={() => {
                router.push(`/home`);
              }}
            >
              Home
            </a>
            <a
              className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-indigo-600 cursor-pointer"
              onClick={() => {
                router.push(`/contribution`);
              }}
            >
              Contributions
            </a>
            <a
              className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-indigo-600 cursor-pointer"
              onClick={() => {
                router.push(`/proposals`);
              }}
            >
              Create proposal
            </a>
          </div>
        ) : (
          ""
        )}

        {!logged && !user ? (
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
                  signUp()
                }}
                className="flex font-medium text-2xl"
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="mr-5 ml-5 font-white flex items-center align-middle justify-center cursor-pointer">
              <a
                onClick={() => {
                  router.push(`/proposals`);
                }}
              ></a>
              {/* <Menu as="div" className="relative inline-block text-left">
           <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 ">
          <IoMdNotifications size={25} color={"white"}/>
          
          </Menu.Button>
        </div>
  
    
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
              <a href="#" className="flex items-center px-2 py-2 mx-1">
                <img className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full" src="https://ipfs.infura.io/ipfs/QmPcGmi195SxtGeM7U6TzhAMqq8Xd1hwaYn9iBArbQEiyA" alt="avatar" />
                <p className="mx-2 text-sm text-gray-600"><span className="font-bold">myfuture.testnet</span> donate on your proposal <span className="font-bold text-blue-500">#2</span> artical . 2m</p>
                </a>
              </Menu.Item>
            
              
             
            </div>
          </Menu.Items>
        
      </Menu> */}

              <Menu as="div" className="relative text-left">
                <div>
                  <Menu.Button className="">
                    <img src={user.picture} width={100} height={100} />
                  </Menu.Button>
                </div>

                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      <a
                        onClick={() => {
                          router.push("/profile");
                        }}
                        className="flex items-center px-2 py-2 mx-1 hover:bg-[#7B62D9] hover:text-cyan-50"
                      >
                        {user.id}
                      </a>
                    </Menu.Item>

                    <Menu.Item>
                      <a
                        onClick={() => {
                          logOut();
                        }}
                        className="flex items-center px-2 py-2 mx-1 hover:bg-[#7B62D9] hover:text-cyan-50"
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>

              {/* <button
                className="w-full h-full text-white hover:text-indigo-600 m-1"
                onClick={() => {
                  router.push("/profile");
                }}
              >
                {user.id}
              </button>
          
              <img src={user.picture} width={50} height={50} />
            </div>
            <div className=" rounded-tr-xl rounded-br-xl font-thin h-11 flex items-center align-middle pl-6 pr-6 hover:text-white font-sans text-white ">
              <button
                onClick={() => {
                  logOut();
                }}
              >
                <LogOutIcon className="w-6"></LogOutIcon>
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
