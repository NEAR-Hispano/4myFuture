import React from "react";
import { initContract } from "../near";
import { LogOutIcon, LoginIcon } from "../icons";
import { useNear } from "../../hooks/useNear";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Proposal from "../../models/Proposal";
import SearchBar from "../home/SearchBar";



interface SearchProps {
  proposals?: Proposal[];
}



function Navbar({proposals}: SearchProps) {
  const [logged, setLogged] = React.useState(false);
  const [user, setUser] = useUser();
  const [nearContext, setNearContext] = useNear();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState([]);
  

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;
    console.log(proposals);
    // eslint-disable-next-line arrow-body-style
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
    await nearContext.walletConnection.signOut();
    setNearContext(null);
    setUser(null);
    router.push("/");
  };

  const userLogged = async () => {
    //const user = await JSON.parse(localStorage.getItem('undefined_wallet_auth_key')) || null
    // const user = await nearContext.walletConnection.getAccountId()
    // if (user) {
    //     setUser(user?.accountId)
    //     setLogged(true);
  };

  React.useEffect(() => {}, []);

  return (
 <div>


      
<div className="w-full flex flex-row items-center p-2 justify-between shadow-xs bg-[#7B62D9]">
  
    <div className="ml-8 cursor-pointer">
     <img src="../images/near_logo_wht.svg" width={200} onClick={() => {router.push(`/home`)}}/>
    </div>
    <span className="w-full md:w-1/3 h-10  border border-[#7B62D9] text-sm rounded-full flex">
       
        {proposals != null? 
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
        <div className="flex flex-row-reverse text-white mr-4 ml-4 md:hidden">
            <button>
                <svg width="20" height="20" fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                    </path>
                </svg>
            </button>
        </div>
        <div className="navbar-menu hidden lg:block lg:w-2/5 lg:text-right">
        <a className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-indigo-600 cursor-pointer" onClick={() => {router.push(`/proposals`)}}>
        Create proposal
        </a>
        <a className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-indigo-600 cursor-pointer" onClick={() => {router.push(`/contribution`)}}>
        Contributions
        </a>
     
        
       
       
         
    
    </div>
   
    {!logged && !user ? 
    <div className="bg-white font-thin h-11 rounded-lg flex items-center align-middle pl-6 pr-6 hover:bg-[#7B62D9]  hover:text-white font-sans text-black ">
    
    <button
      onClick={() => {
        logIn();
      }}
      className="flex"
    >
      Login
      <LoginIcon className="w-6 ml-4 flex align-middle justify-center items-center"></LoginIcon>
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



       {/* <div className="w-full h-16 flex bg-primary-50 text-white pl-8 pr-8 border-0 shadow-2xl">
      
      <div className="flex justify-between items-center align-middle w-full h-full">
        <div>
          <a href="/home" className="text-3xl font-bold">
            {" "}
            4MyFutureDApp{" "}
          </a>
        </div>

        <div className="flex text-xl font-extralight items-center align-middle h-full">
          {!logged && !user ? (
            <div className="bg-white font-thin h-11 rounded-lg flex items-center align-middle pl-6 pr-6 hover:bg-gray-800 hover:text-white font-sans text-black ">
              <button
                onClick={() => {
                  logIn();
                }}
                className="flex"
              >
                Login
                <LoginIcon className="w-6 ml-4 flex align-middle justify-center items-center"></LoginIcon>
              </button>
            </div>
          ) : (
            <div className="flex ">
              <div className="flex justify-center align-middle items-center mr-2">
                <button
                  className="text-black shadow-xl flex justify-center items-center align-middle text-xl border-0 w-full h-full hover:border-2 hover:border-black bg-green-500 pr-3 pl-3 rounded-tl-xl rounded-bl-xl"
                  onClick={() => {
                    router.push("/proposals");
                  }}
                >
                  Create Proposal
                </button>
              </div>
              <div className="flex bg-white rounded-tr-xl rounded-br-xl">
                <div className="mr-5 ml-5 font-white flex items-center align-middle justify-center">
                <img src="https://images.unsplash.com/photo-1520315342629-6ea920342047?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNhdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="block mx-auto object-cover rounded-full h-10 w-10 "/>
                  <button
                    className="w-full h-full text-black hover:text-green-500"
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    {user.id}
                  </button>
                </div>
                <div className="bg-gray-200 rounded-tr-xl rounded-br-xl font-thin h-11 flex items-center align-middle pl-6 pr-6 hover:bg-gray-800 hover:text-white font-sans text-black ">
                  <button
                    onClick={() => {
                      logOut();
                    }}
                  >
                    <LogOutIcon className="w-6"></LogOutIcon>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div> */}
    </div>   
   
  );
}

export default Navbar;
