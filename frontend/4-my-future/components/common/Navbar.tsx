import React from "react";
import { initContract } from "../near";
import { LogOutIcon, LoginIcon } from "../icons";
import { useNear } from "../../hooks/useNear";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import Proposal from "../../models/Proposal";
import SearchBar from "../home/SearchBar";

function Navbar() {
  const [logged, setLogged] = React.useState(false);
  const [user, setUser] = useUser();
  const [nearContext, setNearContext] = useNear();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState([]);
  const [proposals, setProposals] = React.useState<Array<Proposal>>([]);

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
    const userId = await nearContext.walletConnection.getAccountId();
        // @ts-ignore: Unreachable code error
    if(!nearContext.contract.getUser(userId))
    // @ts-ignore: Unreachable code error
    nearContext.contract.createUser(userId);
    console.log('User Created')
  };

  const logOut = async () => {
    await nearContext.walletConnection.signOut();
    setNearContext(null);
    setUser(null);
    router.push("/");
  };

  const loadProposals = async() => {
    // @ts-ignore: Unreachable code error
    const proposalList = nearContext.contract.getAllProposals().then(() => { setProposals(proposalList) })
  }

  const userLogged = async () => {
    //const user = await JSON.parse(localStorage.getItem('undefined_wallet_auth_key')) || null
    // const user = await nearContext.walletConnection.getAccountId()
    // if (user) {
    //     setUser(user?.accountId)
    //     setLogged(true);
  };

  React.useEffect(() => {
    loadProposals()
  }, []);

  return (
 <div>


      
<div className="w-full flex flex-row items-center p-2 justify-between shadow-xs bg-[#7B62D9]">
  
    <div className="ml-8 cursor-pointer">
     <img src="../images/near_logo_wht.svg" width={200} onClick={() => {router.push(`/`)}}/>
    </div>
    <span className="w-full md:w-1/3 h-10  border border-[#7B62D9] text-sm rounded-full flex">
       
        {proposals != null && user? 
         <input type="search" placeholder="Search proposal" className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none" onChange={handleFilter}/>
        : <div></div>}
    
        {searchTerm?.length !== 0 && (
        <div className="w-100 h-32 bg-gray-50 overflow-hidden overflow-y-auto text-lg p-2 mt-1 shadow-lg scrollbar-hide rounded">
          {searchTerm?.map((value) => (
           
           <button
              onClick={() => {router.push(`/proposal/${value.index}`)}} //FIXME
              className="w-ful flex items-center border-b-2 p-3 border-primary-blue-400 hover:bg-gray-100 hover:text-black text-gray-500 scrollbar-hide mt-2"
            >{value.title}
            </button>
          ))}
        </div>
        )}
        </span>
        <span className="w-full md:w-1/3 h-10  border border-[#7B62D9] text-sm rounded-full flex">
          {/* {proposals != null ? (
            <input
              type="search"
              placeholder="Search proposal"
              className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
              onChange={handleFilter}
            />
          ) : 
            <div></div>
          } */}

          {searchTerm?.length !== 0 && (
            <div className="w-100 h-32 bg-gray-50 overflow-hidden overflow-y-auto text-lg p-2 mt-1 shadow-lg scrollbar-hide rounded">
              {searchTerm?.map((value) => (
                <button
                  onClick={() => {
                    router.push(`/proposal/${value.index}`);
                  }} //FIXME
                  className="w-ful flex items-center border-b-2 p-3 border-primary-blue-400 hover:bg-gray-100 hover:text-black text-gray-500 scrollbar-hide mt-2"
                >
                  {value.title}
                </button>
              ))}
            </div>
          )}
        </span>
        {/* <div className="flex flex-row-reverse text-white mr-4 ml-4 md:hidden">
          <button>
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="h-8 w-8"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
            </svg>
          </button>
        </div> */}
        {user?  <div className="navbar-menu hidden lg:block lg:w-2/5 lg:text-right">
        <a className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-indigo-600 cursor-pointer" onClick={() => {router.push(`/home`)}}>
        Home
        </a>
        <a className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-indigo-600 cursor-pointer" onClick={() => {router.push(`/contribution`)}}>
        Contributions
        </a>
        <a className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-indigo-600 cursor-pointer" onClick={() => {router.push(`/proposals`)}}>
        Create proposal
        </a>   
        </div>: "" }
       
   
    {!logged && !user ? 
    <div className="bg-white font-thin h-12 mr-3 rounded-lg flex items-center justify-center align-middle pl-6 pr-6 hover:bg-[#7B62D9]  hover:text-white font-sans text-black ">
    
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
    : <div className="flex">   
                <div className="mr-5 ml-5 font-white flex items-center align-middle justify-center cursor-pointer">
               
                  <button
                    className="w-full h-full text-white hover:text-indigo-600 m-1"
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    {user.id}
                  
                  </button>
                  <img src={user.picture} width={50} height={50}/>
                </div>
                <div className=" rounded-tr-xl rounded-br-xl font-thin h-11 flex items-center align-middle pl-6 pr-6 hover:text-white font-sans text-white ">
                  <button
                    onClick={() => {
                      logOut();
                    }}
                  >
                    <LogOutIcon className="w-6"></LogOutIcon>
                  </button>
                </div>
              </div>}
              
     
       
      

        
  
    </div>



      </div>

   
    
  );
}

export default Navbar;
