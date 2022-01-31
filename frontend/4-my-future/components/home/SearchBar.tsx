import React from "react";
import Proposal from "../../models/Proposal";
import {useRouter} from 'next/router';


interface SearchProps {
  data?: Proposal[];
}

export default function Search({ data }: SearchProps) {
  const [searchTerm, setSearchTerm] = React.useState([]);
  const router = useRouter();
  

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;
    console.log(data);
    // eslint-disable-next-line arrow-body-style
    const newFilter = data.filter((value) => {
      if (searchWord === "") return null;
      return value.title.toLowerCase().includes(searchWord);
    });
    setSearchTerm(newFilter);
  };
  return (
    <div className="">
      <div className="flex">
        <input
          className="input-text w-full h-16 shadow-md pl-4 focus:ring-1 text-xl border-2 border-green-500 focus:ring-primary-100 "
          type="text"
          name="search"
          id="search"
          onChange={handleFilter}
          placeholder="Found Proposals"
        />
        <button
          className="bg-gray-800 hover:bg-white  hover:text-black ml-1 pr-6 pl-6 rounded-r-xl font-bold text-xl border-2 text-white border-black"
        >Search
        </button>
      </div>
      {searchTerm?.length !== 0 && (
        <div className=" w-1/4 h-32 bg-gray-50 z-50 absolute overflow-hidden overflow-y-auto text-lg p-2 mt-1 shadow-lg scrollbar-hide">
          {searchTerm?.map((value) => (
            <button
              onClick={() => {router.push(`/proposal/${value.index}`)}} //FIXME
              className="w-ful flex items-center border-b-2 p-3 border-primary-blue-400 hover:bg-gray-100 hover:text-black text-gray-500 scrollbar-hide"
            >{value.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
