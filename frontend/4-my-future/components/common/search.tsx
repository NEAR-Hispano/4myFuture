import React from "react";
import { initContract } from "../near";
import { LogOutIcon, LoginIcon } from "../icons";
import { useNear } from "../../hooks/useNear";
import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import Proposal from "../../models/Proposal";
import SearchBar from "../home/SearchBar";
import { IoMdNotifications } from 'react-icons/io';
import Dropdown from "./dropdown";
import Config from "./config";
import { Menu } from "@headlessui/react";

interface SearchProps {
    data?: Proposal[];
  }

function Search({ data }: SearchProps) {

  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState([]);
  const [proposals, setProposals] = React.useState<Array<Proposal>>([]);
  const [nearContext, setNearContext] = useNear();

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;
    console.log(data);
    const newFilter = data.filter((value) => {
      if (searchWord === "") return null;
      return value.title.toLowerCase().includes(searchWord);
    });
    setSearchTerm(newFilter);
  };



 

  const userLogged = async () => {
    //const user = await JSON.parse(localStorage.getItem('undefined_wallet_auth_key')) || null
    // const user = await nearContext.walletConnection.getAccountId()
    // if (user) {
    //     setUser(user?.accountId)
    //     setLogged(true);
  };

  React.useEffect(() => {
   console.log(data)
  }, []);

  return (
    <div>
        <span className="w-full md:w-1/3 h-10  border border-[#7B62D9] text-sm rounded-full flex">
         
            <input
              type="search"
              placeholder="Search proposal"
              className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
              onChange={handleFilter}
            />
          
        

      
        </span>
        <span className="w-full md:w-9/12 h-10  border border-[#7B62D9] text-sm rounded-full flex">
          {searchTerm?.length !== 0 && (
            <div className="w-full h-32 bg-gray-50 overflow-hidden overflow-y-auto text-lg p-2 mt-1 shadow-lg scrollbar-hide rounded">
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
      
  

    </div>
  );
}

export default Search;
