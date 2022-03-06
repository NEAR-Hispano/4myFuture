import React from "react";
import Proposal from "../../models/Proposal";
import SearchBar from "./SearchBar";
import User from "../../models/User";
import AppSummary from "./AppSummary";
import Contribution from "../../models/Contribution";

interface SearchHomeProps {
  data?: Proposal[];
  contribution?: Contribution[];
  users?: User[];
}

function SearchHome({ data, contribution, users }: SearchHomeProps) {
  return (
    <div className="flex flex-col w-full items-center justify-center align-middle h-1/2 border-b-2 pb-20 mb-2 shadow-xl ">
      <div className="flex justify-center items-center align-middle">
        <div className="w-2/3">
          <img
            src="/landing/graduation-l.png"
            alt=""
          />
        </div>
      </div>
      <div className="text-4xl font-sans font-thin">
        Help <span className="text-[#7B62D9] font-semibold">students</span>{" "}
        reach their dreams
      </div>
      <div className="mt-16 w-2/3">
        <AppSummary
          proposals={data}
          contribution={contribution}
          users={users}
        ></AppSummary>
      </div>
    </div>
  );
}

export default SearchHome;
